import React from 'react';
import HeroSection from './HeroSection';
import AboutSection from './Homesection3';
import FeaturedWorks from './Homesection2';
import OurServices from './Homesection4';
import './Home.css';

function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturedWorks />
      <OurServices />
    </>
  );
}

export default Home;