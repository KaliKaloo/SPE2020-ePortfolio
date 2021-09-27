import React from 'react';
import PubHomePosts from '../components/pubHomePosts';
import PubFooter from '../components/pubFooter';

function PubHome({user, posts}) {

  console.log(posts)

  return (
    <>
      <PubHomePosts user={user} posts={posts}/>
      <PubFooter/>
    </>
  );
}

export default PubHome;