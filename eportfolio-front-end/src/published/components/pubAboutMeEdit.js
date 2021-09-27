import React from 'react';
import ContentEditable from "react-contenteditable";
import '../../components/styles/Button.css';
import '../../components/styles/AboutMeEdit.css';


function PubAboutMeEdit({user}) {
  return (
    <div className="aboutme-secton">

      <ContentEditable
        className="SmallText_fullName"
        tagName="pre"
        html={user?.firstName +" "+ user?.lastName} // innerHTML of the editable div
        disabled={true} // use true to disable edition
        onChange={null}
      />
      <ContentEditable
        className="SmallText"

        tagName="pre"
        html={user?.email} // innerHTML of the editable div
        disabled={true} // use true to disable edition
        onChange={null}
      />

      <textarea
        className="LargeText"
        value={user?.description} // innerHTML of the editable div
        disabled={true} // use true to disable edition
        onChange={null}
      />
    </div>
  );
}

export default PubAboutMeEdit;

