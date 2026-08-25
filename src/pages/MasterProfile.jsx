import React from 'react';
import MasterProfileComponent from '../components/MasterProfile';
import AboutSection from '../components/AboutSection';
import Footer from '../components/Footer';
import CircularTransition from '../components/CircularTransition';

export default function MasterProfile() {
  return (
    <div>
      <MasterProfileComponent />
      <AboutSection />
      <CircularTransition>
        <Footer />
      </CircularTransition>
    </div>
  );
}
