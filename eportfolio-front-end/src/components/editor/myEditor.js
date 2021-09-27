import React, { useEffect, useState } from 'react';
import { convertToRaw, convertFromRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { Link, useHistory } from 'react-router-dom';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Dropzone from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css'
import '../styles/Editor.css';

function MyEditor(props) {
  const [files,] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [postWarning, setPostWarning] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  let draft = false;
  const history = useHistory();

  // called every time a file's `status` changes
  const handleChangeStatus = ({ file }, status) => {
    if (status === "done") {
      files.push(file)
      console.log(files);
    }
  };

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  }

  const handleDraftSubmit = (e) => {
    draft = true;
    handleSubmit(e);
  }

  const handleupdatedPost = async () => {
    setSubmitting(true);
    var convertedData = convertToRaw(editorState.getCurrentContent())
    var jsonData = JSON.stringify(convertedData);
    const resp = await fetch(
      'https://api.youreportfolio.uk/post/' + props.postid,
      {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: jsonData,
          title: title,
          category: category,
          draft: draft,
        })
      });

    if (resp.ok) {
      await resp.json();
      if (files.length === 0) {
        history.push('/Home');
      } else {
        throw Error(resp.statusText);
      }
    }
    else{
        setSubmitting(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true);

    if (title.length === 0) {
      setPostWarning(true);
    } else {
      var convertedData = convertToRaw(editorState.getCurrentContent())
      var jsonData = JSON.stringify(convertedData);

      const resp = (await fetch('https://api.youreportfolio.uk/post/', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json',
          'X-Forwarded-Host': 'api.youreportfolio.uk',
          'X-Forwarded-Proto': 'https'
        },
        body: JSON.stringify({
          title: title,
          content: jsonData,
          category: category,
          draft: draft,
        })
      }));
      if (resp.ok) {
        const post = await resp.json();
        if (files.length === 0) {
          history.push('/Home');
        }
        else {
          for (const f of files) {
            const uriresp = await fetch(
              'https://api.youreportfolio.uk/uploadlink/?postid=' + post.id,
              {
                method: 'POST',
                mode: 'cors',
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('token'),
                  'X-Forwarded-Host': 'api.youreportfolio.uk',
                  'X-Forwarded-Proto': 'https'
                }
              }
            );
            if (uriresp.ok) {
              const uri = await uriresp.json();
              const s3res = await fetch(
                uri,
                {
                  method: 'PUT',
                  mode: 'cors',
                  headers: {
                    "Content-Type": f.type
                  },
                  body: f,
                }
              );
              console.log(s3res.url);
              history.push('/Home');


            }
          }
        }
      } else {
        setSubmitting(false);
        window.alert("Error: Could not submit post");
        return Promise.reject(resp);
      }
    }
  }

  useEffect(() => {
    (async () => {
      if (props.postid !== undefined) {
        const resp = await fetch(
          'https://api.youreportfolio.uk/post/' + props.postid,
          {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token'),
              'Content-Type': 'application/json',
            }
          });

        if (resp.ok) {
          const post = await resp.json();
          setTitle(post.title);
          setCategory(post.category);
          onEditorStateChange((EditorState.createWithContent(convertFromRaw(JSON.parse(post.content)))));

        } else {
          throw Error(resp.statusText);
        }
      }
    })();
  }, [props.postid]);

  return (
    <div>
      {submitting
        ?
        <div style={{
          height: "100vh"
        }}>
          <h2>
            Post submitting...
          </h2>
        </div>
        :

        <div className="Add-Post-Component">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">Title</span>
            </div>
            <input
              type="text"
              className="form-control"
              value={title}
              aria-label="Title"
              aria-describedby="basic-addon1"
              onChange={(e) => setTitle(e.target.value)}
            />
            {postWarning ?
              <d className="warning">
                <div className="alert alert-danger" role="alert">
                  Post title cannot be empty
                </div>
              </d>
              : null}
          </div>
          <Editor
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            wrapperClassName="rich-editor demo-wrapper"
            toolbar={{
              options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'link', 'image'],
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
            }}
          />

          <Dropzone
            onChangeStatus={handleChangeStatus}
          />

          <div className="drop-down">
            <select className="custom-select" defaultValue={category}
              onChange={e => setCategory(e.target.value)}>
              <option value="">Category...</option>
              <option value="Projects">Project</option>
              <option value="Work Experience">Work Experience</option>
              <option value="Achievements">Achievements</option>
              <option value="Qualifications">Qualifications</option>
            </select>
          </div>

          <span>
            <div className="post-buttons">
              <Link to="/Home">
                <button className="btn btn-secondary">Cancel</button>
              </Link>


              {props.postid !== undefined ?
                <>
                  <Link to="/Repo">
                    <button className="btn btn-info" onClick={handleupdatedPost} id="post-submit-button">Save</button>
                  </Link>
                </>
                :
                <>
                  <Link to="/Home">
                    <button className="btn btn-secondary" onClick={handleDraftSubmit} id="post-draft-button">Draft</button>
                  </Link>
                  <Link to="/Repo">
                    <button className="btn btn-info" onClick={handleSubmit} id="post-submit-button">Submit</button>
                  </Link>
                </>
              }
            </div>
          </span>
        </div>
      }
    </div>
  );
}

export default MyEditor;