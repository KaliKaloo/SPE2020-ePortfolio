import React from 'react';
import RepoPosts from '../../components/posts/RepoPosts';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import '../../components/styles/Footer.css';

function Achievements() {
  return (
    <>
      <Navbar />
      <RepoPosts
      category={"Achievements"} />
      <Footer />
    </>
  );
}
export default Achievements;
