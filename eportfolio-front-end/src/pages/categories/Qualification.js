import React from 'react';
import RepoPosts from '../../components/posts/RepoPosts';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import '../../components/styles/Footer.css';

function Qualification() {
  return (
    <div className="section">
        <Navbar />
        <RepoPosts
        category={"Qualifications"} />
        <Footer />
    </div>
  );
}
export default Qualification;
