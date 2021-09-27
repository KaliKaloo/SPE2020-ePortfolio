import React from 'react';
import PubRepoPosts from '../components/pubRepoPosts';
import PubFooter from '../components/pubFooter';

function PubAchievements({user, posts}) {

  return (
    <>
      <PubRepoPosts
        category={"Achievements"} user={user} unfilteredPosts={posts}/>
      <PubFooter/>
    </>
  );
}

export default PubAchievements;
