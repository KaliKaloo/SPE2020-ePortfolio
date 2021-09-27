import React from 'react';
import '../../components/styles/Posts.css';
import PubAboutMeEdit from './pubAboutMeEdit';
import PubImgUpload from "./image/pubImgUpload";
import PubPostItem from "./pubPostItem";

function PubHomePosts({user, posts}) {

  console.log(posts)

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
      <div className="posts">
        <div className="post__container">
          <div className="post__wrapper">
            {
              posts["_embedded"] === undefined ? "" : posts._embedded.posts.map((item, index) => <PubPostItem
                key={index}
                postItem={item}/>)
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default PubHomePosts;
  
