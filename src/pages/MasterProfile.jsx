import React from 'react';
import MasterProfileComponent from '../components/MasterProfile';
import Navbar from '../components/Navbar';
import AboutSection from '../components/AboutSection';
import Footer from '../components/Footer';

export default function MasterProfile() {
  return (
    <div>
      <Navbar />
      <MasterProfileComponent />
      <AboutSection />
      <Footer />
    </div>
  );
}
