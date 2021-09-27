import React from 'react';
import PubRepoPosts from '../components/pubRepoPosts';
import PubFooter from '../components/pubFooter';

function PubWorkExpr({user, posts}) {
    return (
        <>
          <PubRepoPosts
            category={"Work Experience"} user={user} unfilteredPosts={posts}/>
          <PubFooter/>
        </>
      );
    }
    

export default PubWorkExpr;
