import React from 'react';
import HeroSection from '../components/landing/HomePage/HeroSection';
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from './LandingData';

function Home() {
  return (
    <>
      <HeroSection {...homeObjOne} />
      <HeroSection {...homeObjTwo} />
      <HeroSection {...homeObjThree} />
      <HeroSection {...homeObjFour} />
    </>
  );
}

export default Home;
