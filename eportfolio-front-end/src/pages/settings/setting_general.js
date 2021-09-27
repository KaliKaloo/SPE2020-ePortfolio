import React, {useState} from 'react';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import SettingsHub from '../../components/settings_hub';
import ContentEditable from "react-contenteditable";
import sanitizeHtml from "sanitize-html";
import {updateOwnDetails} from "../../services/api/UserApi";
import "../../styles/settingsPage.css"

function General() {
    let user = JSON.parse(localStorage.getItem("user"));
    
    let [username, setUsername] = useState(user.username);
    let [firstname, setfirstName] = useState(user.firstName);
    let [lastname, setlastName] = useState(user.lastName);
    let [email, setEmail] = useState(user.email);
    let [aboutMe, setAboutMe] = useState(user.description);
    const editable = true;

    const sanitizeConf = {
        allowedTags: ["b", "i", "em", "strong", "a", "p", "h1"],
        allowedAttributes: {a: ["href"]}
      };
    
      const sanitize = () => {
        aboutMe = sanitizeHtml(aboutMe, sanitizeConf);
      };
      
      const handleCancel =() =>{
          setUsername(user.username);
          setfirstName(user.firstName);
          setlastName(user.lastName);
          setEmail(user.email);
          setAboutMe(user.description);
      }
    
      const saveInfo = async (e) => {
        e.preventDefault()
    
        user.firstName = firstname;
        user.lastName = lastname;
        user.email = email;
        user.description = aboutMe;
    
        const resp = await updateOwnDetails(user);
        // const newProfile = await userFromUsername(user.username);
        localStorage.setItem('user', JSON.stringify(resp));
        console.log("new user details " + localStorage.getItem('user'));
        // toggleEditable();
      };

  return (
    <>
    <Navbar />
    <div className="settings_mainpage">
        <div className="settings">
            <SettingsHub/>
            <div className="settings_right_container">
                <h5>General Account Settings</h5>
                <div setting_options>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Username</label>
                        <div className="col-sm-10">
                            <ContentEditable
                                className="smallText"
                                tagName="pre"
                                html={username} // innerHTML of the editable div
                                disabled={!editable} // use true to disable edition
                                onChange={e => setUsername(e.target.value)} // handle innerHTML change
                                onBlur={sanitize}
                            />
                        </div>

                        <label className="col-sm-2 col-form-label">Firstname</label>
                        <div className="col-sm-10">
                            <ContentEditable
                                className="smallText"
                                tagName="pre"
                                html={firstname} // innerHTML of the editable div
                                disabled={!editable} // use true to disable edition
                                onChange={e => setfirstName(e.target.value)} // handle innerHTML change
                                onBlur={sanitize}
                            />
                        </div>

                        <label className="col-sm-2 col-form-label">Lastname</label>
                        <div className="col-sm-10">

                            <ContentEditable
                                className="smallText"
                                tagName="pre"
                                html={lastname} // innerHTML of the editable div
                                disabled={!editable} // use true to disable edition
                                onChange={e => setlastName(e.target.value)} // handle innerHTML change
                                onBlur={sanitize}
                            />
                        </div>

                        <label className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                        <ContentEditable
                            className="smallText"
                            tagName="pre"
                            html={email} // innerHTML of the editable div
                            disabled={!editable} // use true to disable edition
                            onChange={e => setEmail(e.target.value)} // handle innerHTML change
                            onBlur={sanitize}
                        />
                        </div>

                        <label className="col-sm-2 col-form-label">Bio</label>
                        <div className="col-sm-10">
                            <textarea
                                className="largeText" 
                                tagName="pre"
                                value={aboutMe === null ? " " : aboutMe} // innerHTML of the editable div
                                disabled={!editable} // use true to disable edition
                                onChange={e => setAboutMe(e.target.value)} // handle innerHTML change
                                onBlur={sanitize}
                            />
                        </div>
                    </div>

                    <div className="buttons ">
                        <button className="btn btn-info" onClick={saveInfo}>
                        {"Update Profile"}
                        </button>
                        <span>
                            <button className="btn btn-light"onClick={handleCancel}> {"Cancel"}
                            </button> 
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Footer />
    </>
    );
}
  
export default General;