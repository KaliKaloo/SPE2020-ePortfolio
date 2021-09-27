import React, { useState, useEffect } from 'react';
import '../../components/styles/Posts.css';
import '../../components/styles/Button.css'
import PubPostItem from './pubPostItem';
import PubAboutMeEdit from './pubAboutMeEdit';
import PubImgUpload from "./image/pubImgUpload";

function PubRepoPosts({user, category, unfilteredPosts}) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async () => {
            if (unfilteredPosts._embedded !== undefined) {
                let p = unfilteredPosts._embedded.posts;
                let filteredPost = [];
                for (var i = 0; i < p.length; i++) {
                    if(p.[i].category === category){
                        filteredPost.push(p.[i])
                    }
                }
                setPosts(filteredPost);
            }
    })();
    },[category, unfilteredPosts]);

  return (
    <div className="mainpage">
      <div className="about_container">
        <div className="about">
          <PubImgUpload user={user}/>
          <div className="intro_text">
            <PubAboutMeEdit user={user}/>
          </div>
        </div>
      </div>

      <div className='posts'>
            <div className='post__container'>
            <div className='post__wrapper'>
                {
                posts.map((item, index) => <PubPostItem key={index} postItem={item} />)
                }
            </div>
            </div>
      </div>
    </div>
  );
}

export default PubRepoPosts;
