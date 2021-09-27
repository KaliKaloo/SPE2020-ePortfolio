import React, { useState, useEffect } from 'react';
import '../styles/Posts.css';
import '../styles/Button.css'
import PostItem from './PostItems';

function RepoPosts({ category }) {
  const [posts, setPosts] = useState([]);
  const [buttonClick, setButtonClick] = useState(true);

  const handleButtonClick = () => {
    setButtonClick(!buttonClick)
  }

  useEffect(() => {
    (async () => {
      const postData = await fetch('https://api.youreportfolio.uk/post/?userid=' + localStorage.getItem('userId'),
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (postData.ok) {
        const postsL = await postData.json();
        if (postsL._embedded !== undefined) {
          let unfilteredPost = postsL._embedded.posts;
          let filteredPost = [];
          for (var i = 0; i < unfilteredPost.length; i++) {
            if (unfilteredPost[i].category === category) {
              filteredPost.push(unfilteredPost[i])
            }
          }
          setPosts(filteredPost);
        }
      }
    })();
  }, [category, buttonClick]);


  return (
    <div className="mainpage">

      <div className='posts--repo'>
        <div className='post__container'>
            <div className="post__wrapper">
           
                {posts.length!==0 ?
                    posts.map((item, index) => 
                    <PostItem key={index} postItem={item} onchange = {() =>{handleButtonClick()}}/>
                )
                :
                    <p className="noPosts">You have no posts in this category yet :)</p>
                }
                
            </div>

        </div>
      </div>
    </div>
  );
}

export default RepoPosts;
