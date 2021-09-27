import React from 'react';
import RepoPosts from '../../components/posts/RepoPosts';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import '../../components/styles/Footer.css';

function Projects() {
  return (
    <div data-testid="ProjectsPage" className="section">
        <Navbar />
        <RepoPosts 
        category={"Project"}/>
        <Footer />
    </div>
  );
}

export default Projects;
