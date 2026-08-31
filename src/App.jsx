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
    const handleResize = () => {
      // Refresh GSAP ScrollTrigger to ensure all markers and pins align with current viewport
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
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