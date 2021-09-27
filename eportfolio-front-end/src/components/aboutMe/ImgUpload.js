import React, { useState } from "react";
import '../styles/Posts.css';


function ImgUpload() {
    const imageUploader = React.useRef(null);

    const [profileURI, updateProfileURI] = useState({
        src: "https://eportfolio-public.s3.amazonaws.com/profile-pic-" + localStorage.getItem('userId'),
        hash: Date.now()
    });

    const [isLoading, setIsLoading] = useState(false)

    const handleImageUpload = async e => {
        const [file] = e.target.files;
        console.log(file)
        if (file) {
            setIsLoading(true);
            const res = await fetch(
                'https://api.youreportfolio.uk/profilepic',
                {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    }
                }
            );
            console.log(res);
            console.log(file);
            if (res.ok) {
                const uri = await res.json();
                console.log(file.type);
                const s3res = await fetch(
                    uri,
                    {
                        method: 'PUT',
                        mode: 'cors',
                        headers: {
                            "Content-Type": file.type
                        },
                        body: file,
                    }
                );
                console.log(s3res);
                console.log(s3res.url);
            }
            updateProfileURI({
                src: "https://eportfolio-public.s3.amazonaws.com/profile-pic-" + localStorage.getItem('userId'),
                hash: Date.now()
            })
            setIsLoading(false)
        }
    };

    return (
        <div className="profile_pic_container">
            <input
                type="file"
                accept="image/x-png,image/jpeg"
                onChange={handleImageUpload}
                ref={imageUploader}
                style={{
                    display: "none"
                }}
            />
            <div
                onClick={() => imageUploader.current.click()}>
                <img
                    src={isLoading ? 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif' : `${profileURI.src}?${profileURI.hash}`}
                    alt="profile-pic"
                    className="picture"
                />
            </div>
        </div>
    );
}

export default ImgUpload;