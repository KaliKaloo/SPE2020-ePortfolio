import React, { useEffect, useState } from 'react';
import '../styles/Posts.css';
import {stateToHTML} from 'draft-js-export-html';
import {convertFromRaw} from 'draft-js';
import {Modal, Button} from 'react-bootstrap';

import IconButton from '@material-ui/core/IconButton';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import {updateOwnPost} from "../../services/api/UserApi";
import {useHistory} from 'react-router-dom';

function PostItem({postItem, onchange}) {
  const [attachmentURIs, setAttachmentURIs] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [draftButton, draftToggle] = useState(true);
  const history = useHistory();


  const convertCommentFromJSONToHTML = (text) => {
    return stateToHTML(convertFromRaw(JSON.parse(text)));
  }

  const handleDraftPost = async() => {

    draftToggle(!draftButton);
    await updateOwnPost(postItem, draftButton);
    onchange();
  }

  const handleDeletePost = async () => {
        console.log(postItem.id);
        
        const postData = await fetch('https://api.youreportfolio.uk/post/' + postItem.id, {
        method: 'DELETE',
        headers: {

            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        })

        if (postData.ok) {
        console.log("post deleted")
        onchange();
        }

  }

  const handleEditPost = () => {
    // history.push("/editpost");
    history.push("/editor/"+ postItem.id, "_blank");
    onchange();
  }

  const MyVerticallyCenteredModal = (props) => {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable={true}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {postItem.title}
            <h3 className='posts__item__category'>  {"Category - " + postItem.category} </h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div dangerouslySetInnerHTML={{ __html: convertCommentFromJSONToHTML(postItem.content) }}>
          </div>
          <div className="attachment-section">
            <IconButton className="attach icon">
              <AttachFileIcon />
            </IconButton>
            {attachmentURIs ?
              <div className='post_links'>
                {
                  attachmentURIs.map(
                    (x, index) =>
                      <div className="attachments" key={index}>
                        <a
                          target="_blank"
                          rel="noreferrer"
                          href={x.s3Link}
                        >
                          <img src={x.s3Link} width="100%" height="100%" alt={x.s3Link}/>
                        </a>
                        <br />
                      </div>
                  )
                }
              </div>
              : null}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  useEffect(() => {
    (async (uri) => {
      const res = await fetch(
        uri,
        {
          "method": "GET"
        }
      );
      if (res.ok) {
        const links = await res.json();
        if (links._embedded !== undefined) {
          setAttachmentURIs(links._embedded.assetModels);
        }
      }
    })(postItem._links.attachments.href);

  }, [postItem._links.attachments.href]);

  // noinspection JSUnresolvedVariable
  return (
    <>
      <div className="postButtons">
        <div className="edit-Button post-Btn">
          <IconButton onClick={handleEditPost}> <EditIcon /> </IconButton>
        </div>
        <div className="draftButton post-Btn">
          <IconButton onClick={handleDraftPost}> <DeleteTwoToneIcon /> </IconButton>
        </div>
        <div className="delButton post-Btn">
          <IconButton onClick={handleDeletePost}> <DeleteForeverIcon /> </IconButton>
        </div>
      </div>

      {/* modal css */}
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <div onClick={() => setModalShow(true)} className={postItem.draft ? 'posts__item__draft' : 'posts__item'}>

        <div className='posts__item__info'>
          <h3 className={postItem.draft ? 'posts__item__title__draft' : 'posts__item__title'}> {postItem.title} </h3>
          <h3 className='posts__item__category'>  {"Category - " + postItem.category} </h3>

          <div className='posts__item__text__preview'>
            <div dangerouslySetInnerHTML={{ __html: convertCommentFromJSONToHTML(postItem.content) }}>
            </div>
          </div>

          <div className="readMore">Read More</div>
          <div className="attachment-section_preview">
            <IconButton className="attach icon">
              <AttachFileIcon />
            </IconButton>
            <div className='post_links'>
              {
                attachmentURIs.map(
                  (x, index) =>
                    <div className="attachments_preview" key={index}>
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={x.s3Link}>
                        {x.s3Link}
                      </a>
                      <br />
                    </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostItem;