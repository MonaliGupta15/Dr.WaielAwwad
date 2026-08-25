import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import MasterProfile from './pages/MasterProfile'
import Gallery from './pages/Gallery'
import Articles from './pages/Articles'
import Contact from './pages/Contact'
import SmoothScroll from './components/SmoothScroll'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  useEffect(() => {
    const handleScale = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const referenceWidth = 1440;

      const rootEl = document.getElementById('root');

      let scale = 1;
      if (width >= 1200 && width < referenceWidth) {
        scale = width / referenceWidth;
        document.documentElement.style.zoom = scale;
        document.documentElement.style.setProperty('--zoom-scale', scale);
        if (rootEl) {
          rootEl.style.zoom = scale;
          rootEl.style.width = `${100 / scale}%`;
        }
      } else {
        document.documentElement.style.zoom = '1';
        document.documentElement.style.setProperty('--zoom-scale', '1');
        if (rootEl) {
          rootEl.style.zoom = '';
          rootEl.style.width = '';
        }
      }

      // Calculate layout height of the viewport
      const layoutHeight = height / scale;

      // Use the actual layout height of the viewport for section heights
      let sectionHeightVal = `${layoutHeight}px`;

      document.documentElement.style.setProperty('--section-height', sectionHeightVal);

      // Tell GSAP ScrollTrigger to recalculate layout dimensions after zoom is applied
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    };

    handleScale();
    window.addEventListener('resize', handleScale);
    return () => {
      window.removeEventListener('resize', handleScale);
      document.documentElement.style.zoom = '';
      document.documentElement.style.removeProperty('--zoom-scale');
      const rootEl = document.getElementById('root');
      if (rootEl) {
        rootEl.style.zoom = '';
        rootEl.style.width = '';
      }
    };
  }, []);

  return (
    <div className="bg-ivory selection:bg-gold/30 selection:text-forest">
      <SmoothScroll>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/master-profile" element={<MasterProfile />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </SmoothScroll>
    </div>
  )
}

export default App