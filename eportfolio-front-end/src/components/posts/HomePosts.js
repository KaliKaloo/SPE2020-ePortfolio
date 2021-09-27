import React, { useEffect, useState } from 'react';
import '../styles/Posts.css';
import '../styles/Button.css'

import AboutMeEdit from '../aboutMe/AboutMeEdit';
import ImgUpload from "../aboutMe/ImgUpload"
import PostItem from './PostItems';
import LinearProgress from "@material-ui/core/LinearProgress";
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {useHistory} from 'react-router-dom';

function HomePosts() {
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [buttonClick, setButtonClick] = useState(true);
  const history = useHistory();
  
  const handleButtonClick =() =>{
        setButtonClick(!buttonClick);
  }

  const openEditor =() =>{
    history.push("/editor");
  }

  const fetchPosts = async () => {
    const postData = await fetch('https://api.youreportfolio.uk/post/?userid=' + localStorage.getItem('userId'),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Forwarded-Host': 'api.youreportfolio.uk',
          'X-Forwarded-Proto': 'https'
        }
      }
    );

    if (postData.ok) {
      const postsL = await postData.json();
      if (postsL._embedded !== undefined) {
        setPosts(postsL._embedded.posts);
      }
      setPostsLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
    }, [buttonClick]);

 return (
    <div className="mainpage">
      <div className="about_container">
        <div className="about">
          <ImgUpload />
          <div className="intro_text">
            <AboutMeEdit />
          </div>
        </div>
      </div>
      
      <div className="posts">
        <div className="post__container">
          <div className="addButton">
            <IconButton onClick={openEditor}> <AddCircleOutlineIcon/> </IconButton>
          </div>
          </div>
            <div className="post__wrapper">
                {
                    postsLoading ?
                    <LinearProgress />
                    :
                    <>
                        {posts.length!==0 ?
                            posts.map((item, index) => 
                            <PostItem key={index} postItem={item} onchange = {() =>{handleButtonClick()}}/>
                        )
                        :
                            <p className="noPosts">You have no posts in this category yet :)</p>
                        }
                    </>
                }
            </div>
        </div>
      </div>
    
  );
}

export default HomePosts;
