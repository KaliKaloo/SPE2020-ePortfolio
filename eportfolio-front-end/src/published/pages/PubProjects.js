import React from 'react';
import PubRepoPosts from '../components/pubRepoPosts';
import PubFooter from '../components/pubFooter';

function PubProjects({user, posts}) {

  return (
    <>
      <PubRepoPosts
        category={"Project"} user={user} unfilteredPosts={posts}/>
      <PubFooter/>
    </>
  );
}

export default PubProjects;
