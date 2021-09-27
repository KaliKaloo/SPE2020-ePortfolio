import React from 'react';
import PubRepoPosts from '../components/pubRepoPosts';
import PubFooter from '../components/pubFooter';

function PubQualification({user, posts}) {

  return (
    <>
      <PubRepoPosts
        category={"Qualifications"} user={user} unfilteredPosts={posts}/>
      <PubFooter/>
    </>
  );
}

export default PubQualification;
