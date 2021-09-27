import React from "react";
import '../../../components/styles/Posts.css';


function PubImgUpload({ user }) {
    const profileURI = {
        src: "https://eportfolio-public.s3.amazonaws.com/profile-pic-" + user?.id,
        hash: Date.now()
    };

    return (
        <div className="profile_pic_container">
            <div>
                <img
                    src={`${profileURI.src}?${profileURI.hash}`}
                    alt="profile-pic"
                    className="picture"
                />
            </div>
        </div>
    );
}

export default PubImgUpload;