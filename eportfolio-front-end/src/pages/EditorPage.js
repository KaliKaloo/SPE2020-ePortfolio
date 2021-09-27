import React from 'react';
import {useParams} from 'react-router-dom';
import MyEditor from '../components/editor/myEditor';
import "../components/styles/Editor.css"
import Navbar from '../components/Navbar';

function EditPost() {
    let {postid} = useParams();
    return (
        <>
            <Navbar/>
            <div className="editpage" >
                <MyEditor postid={postid}/>
            </div>
        </>
    );
}

export default EditPost;