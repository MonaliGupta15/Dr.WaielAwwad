import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CircularTransition = ({ children }) => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Start the circle at the top-center (50% 0%) with 0% radius,
      // and animate it to 150% radius to fully reveal the section.
      gsap.fromTo(
        containerRef.current,
        {
          clipPath: 'circle(0% at 50% 0%)',
        },
        {
          clipPath: 'circle(150% at 50% 0%)',
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',   // starts when the top of this section enters the bottom of viewport
            end: 'top 20%',        // completes when the top of this section reaches 20% from the top of viewport
            scrub: 1,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden will-change-[clip-path]">
      {children}
    </div>
  );
};

export default CircularTransition;