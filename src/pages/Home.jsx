import React from 'react';
import HeroSection from '../components/HeroSection';
import IntroductionSection from '../components/IntroductionSection';
import CareerPreview from '../components/CareerPreview';
import AtAGlanceSection from '../components/AtaGlanceSection';
import Footer from '../components/Footer';
import CircularTransition from '../components/CircularTransition';

const Home = () => {
  return (
    <div>
      <HeroSection />

      <CircularTransition>
        <CareerPreview />
      </CircularTransition>

      <CircularTransition>
        <AtAGlanceSection />
      </CircularTransition>

      <CircularTransition>
        <Footer />
      </CircularTransition>
    </div>
  );
};

export default Home;