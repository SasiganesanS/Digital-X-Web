import React from 'react';
import HeroSection from './HeroSection';
import AboutSection from './Homesection3';
import FeaturedWorks from './Homesection2';
import OurServices from './Homesection4';
import HomeSpaceBackground from './HomeSpaceBackground';
import './Home.css';

function Home() {
  return (
    <div className="relative w-full overflow-hidden bg-[#050609]">
      {/* Home-scoped Continuous Parallax Space Environment */}
      <HomeSpaceBackground />

      {/* Main Home Content Sections */}
      <div className="relative z-10 w-full">
        <HeroSection />
        <FeaturedWorks />
        <AboutSection />
        <OurServices />
      </div>
    </div>
  );
}

export default Home;