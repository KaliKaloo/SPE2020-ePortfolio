import React, {useState} from 'react';
import ContentEditable from "react-contenteditable";
import sanitizeHtml from "sanitize-html";
import "../styles/Button.css"
import "../styles/AboutMeEdit.css";
import {updateOwnDetails, userFromUsername} from "../../services/api/UserApi";

function AboutMeEdit() {
  let user = JSON.parse(localStorage.getItem("user"));
  
  let [firstname, setfirstName] = useState(user.firstName);
  let [lastname, setlastName] = useState(user.lastName);
  let [name, setName] = useState(firstname + ' ' + lastname);
  let [email, setEmail] = useState(user.email);
  let [aboutMe, setAboutMe] = useState(user.description);
  const [editable, setEditable] = useState(false);

  const sanitizeConf = {
    allowedTags: ["b", "i", "em", "strong", "a", "p", "h1"],
    allowedAttributes: {a: ["href"]}
  };

  const sanitize = () => {
    aboutMe = sanitizeHtml(aboutMe, sanitizeConf);
  };

  const toggleEditable = () => {
    setEditable(!editable);
  };

  const handleCancel =() =>{
    setfirstName(user.firstName);
    setlastName(user.lastName);
    setEmail(user.email);
    setAboutMe(user.description);
    toggleEditable();
    }

  const saveInfo = async (e) => {
    e.preventDefault()

    user.firstName = firstname;
    user.lastName = lastname;
    user.email = email;
    user.description = aboutMe;

    await updateOwnDetails(user);
    const newProfile = await userFromUsername(user.username);
    localStorage.setItem('user', JSON.stringify(newProfile));
    console.log("new user details " + localStorage.getItem('user'));
    toggleEditable();
  };


  return (
    <div className="aboutme-secton">
        {
        editable ?
          <div className="save-cancel-edit-btn ">
            <button className="btn btn-light btn-save" onClick={saveInfo}>
              {"Save"}
            </button>
            <span>
                <button className="btn btn-light" onClick={handleCancel}> 
                {"Cancel"}
                </button> 
            </span>
          </div>
          :
          <div className="save-cancel-edit-btn ">
            <button className="btn btn-light btn-block" onClick={toggleEditable}>
              {"Edit Profile"}
            </button>
          </div>
        }
        {
        editable ?
          <div>
            <ContentEditable
              className="SmallEditable"
              tagName="pre"
              html={firstname} // innerHTML of the editable div
              disabled={!editable} // use true to disable edition
              onChange={e => setfirstName(e.target.value)} // handle innerHTML change
              onBlur={sanitize}
            />
            <ContentEditable
              className="SmallEditable"
              tagName="pre"
              html={lastname} // innerHTML of the editable div
              disabled={!editable} // use true to disable edition
              onChange={e => setlastName(e.target.value)} // handle innerHTML change
              onBlur={sanitize}
            />
          </div>

          :
          <ContentEditable 
            className={editable ? "SmallEditable " : "SmallText_fullName"}
            tagName="pre"
            html={name} // innerHTML of the editable div
            disabled={!editable} // use true to disable edition
            onChange={e => setName(e.target.value)} // handle innerHTML change
            onBlur={sanitize}
          />
      }

      <ContentEditable
        className={editable ? "SmallEditable" : "SmallText"}
        tagName="pre"
        html={email} // innerHTML of the editable div
        disabled={!editable} // use true to disable edition
        onChange={e => setEmail(e.target.value)} // handle innerHTML change
        onBlur={sanitize}
      />

      <textarea 
        className={editable ? "LargeEditable" : "LargeText"}
        value={aboutMe === null ? " " : aboutMe} // innerHTML of the editable div
        disabled={!editable} // use true to disable edition
        onChange={e => setAboutMe(e.target.value)} // handle innerHTML change
        onBlur={sanitize}
      />

     
    </div>
  );
}

export default AboutMeEdit;

