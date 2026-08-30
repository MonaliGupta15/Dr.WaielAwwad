import React, { useEffect, lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Preloader from './components/Preloader'
import SmoothScroll from './components/SmoothScroll'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Lazy-load page components for ultra-fast initial page loading
const Home = lazy(() => import('./pages/Home'))
const MasterProfile = lazy(() => import('./pages/MasterProfile'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Articles = lazy(() => import('./pages/Articles'))
const Contact = lazy(() => import('./pages/Contact'))

gsap.registerPlugin(ScrollTrigger);

const PageFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-ivory text-charcoal font-mono text-xs uppercase tracking-[0.25em]">
    <span className="animate-pulse">Loading...</span>
  </div>
);

const App = () => {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    const handleScale = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const referenceWidth = 1440;

      const rootEl = document.getElementById('root');

      let scale = 1;
      if (width >= 1024 && width < referenceWidth) {
        scale = width / referenceWidth;
        document.documentElement.style.zoom = '1';
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
      <Preloader />
      <SmoothScroll>
        <Navbar />
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/master-profile" element={<MasterProfile />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </SmoothScroll>
    </div>
  )
}

export default App