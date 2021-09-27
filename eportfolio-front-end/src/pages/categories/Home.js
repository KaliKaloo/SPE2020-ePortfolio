import React from 'react';
import HomePosts from '../../components/posts/HomePosts';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

function Home() {
  return (
    <>
      <Navbar />
      <HomePosts/>
      <Footer />
    </>
  );
}

export default Home;
