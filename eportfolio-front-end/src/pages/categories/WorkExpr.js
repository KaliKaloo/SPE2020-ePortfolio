import React from 'react';
import RepoPosts from '../../components/posts/RepoPosts';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';


function WorkExpr() {
  return (
    <>
      <Navbar />
      <RepoPosts
      category={"Work Experience"} />
      <Footer />
    </>
  );
}
export default WorkExpr;
