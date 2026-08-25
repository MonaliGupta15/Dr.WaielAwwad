import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Check if user has already seen preloader in this session
    const hasSeen = sessionStorage.getItem('hasSeenPreloader');
    if (hasSeen) {
      setIsDone(true);
      if (onComplete) onComplete();
      return;
    }

    let currentProgress = 0;
    const interval = setInterval(() => {
      // Accelerate progress up to 90%, then wait for load
      if (currentProgress < 90) {
        currentProgress += Math.floor(Math.random() * 12) + 5;
        if (currentProgress > 90) currentProgress = 90;
        setProgress(currentProgress);
      }
    }, 80);

    const handleLoad = () => {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        setIsDone(true);
        sessionStorage.setItem('hasSeenPreloader', 'true');
        if (onComplete) onComplete();
      }, 500);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    // Safety fallback after max 2.5s
    const fallbackTimeout = setTimeout(() => {
      handleLoad();
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(fallbackTimeout);
      window.removeEventListener('load', handleLoad);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-between bg-charcoal px-6 py-12 text-ivory select-none"
        >
          {/* Top Brand Tag */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase text-gold"
          >
            Dr. Waiel Awwad
          </motion.div>

          {/* Center Brand Monogram & Counter */}
          <div className="flex flex-col items-center text-center max-w-lg">
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="font-display text-[clamp(28px,5vw,64px)] leading-[1.0] uppercase tracking-[-0.02em] text-ivory"
            >
              Leadership & Journalism
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase text-ivory/60 mt-4"
            >
              South Asia · West Asia · Global Press
            </motion.p>

            {/* Percentage counter */}
            <div className="mt-10 flex items-baseline gap-1 font-display text-4xl sm:text-5xl text-gold">
              <span>{progress}</span>
              <span className="text-xl font-sans opacity-70">%</span>
            </div>

            {/* Smooth Progress Bar */}
            <div className="w-48 sm:w-64 h-[2px] bg-ivory/10 rounded-full mt-6 overflow-hidden">
              <motion.div
                className="h-full bg-gold"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* Bottom Footer Monogram */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-ivory/40"
          >
            Since 1979 · Archive & Profile
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
