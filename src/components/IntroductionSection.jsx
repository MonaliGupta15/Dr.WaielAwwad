// src/pages/Introduction.jsx

import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import introImage from '../assets/Waiel-awwad.jpg';

gsap.registerPlugin(ScrollTrigger);

const IntroductionSection = () => {
  const sectionRef = useRef(null);
  const imageWrapRef = useRef(null);
  const imageTiltRef = useRef(null);
  const imageRef = useRef(null);
  const shadowRef = useRef(null);
  const markerRef = useRef(null);

  useLayoutEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mql.matches) return;

    const ctx = gsap.context(() => {
      // Slide in from left for the image wrap
      gsap.fromTo(
        imageWrapRef.current,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { scale: 1.15 },
        {
          scale: 1,
          duration: 1.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );

      gsap.fromTo(
        markerRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );

      // Subtle 3D tilt on mouse move — desktop only, restrained range
      const tiltEl = imageTiltRef.current;
      const wrapEl = imageWrapRef.current;
      if (!tiltEl || !wrapEl || window.innerWidth < 1024) return;

        const handleMouseMove = (e) => {
        const rect = wrapEl.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(tiltEl, {
          rotateY: px * 10,
          rotateX: -py * 10,
          duration: 0.6,
          ease: 'power2.out',
          transformPerspective: 900,
        });

        gsap.to(imageRef.current, {
          x: px * 14,
          y: py * 14,
          duration: 0.8,
          ease: 'power2.out',
        });

        // Shadow shifts opposite the tilt direction and deepens
        // slightly — mimics how a physical object's shadow moves as
        // it tilts under a fixed light source
        gsap.to(shadowRef.current, {
          x: -px * 20,
          y: 16 - py * 10,
          opacity: 0.32,
          duration: 0.7,
          ease: 'power2.out',
        });
      };

      const handleMouseLeave = () => {
        gsap.to(tiltEl, {
          rotateY: 0,
          rotateX: 0,
          duration: 0.9,
          ease: 'power3.out',
        });
        gsap.to(imageRef.current, {
          x: 0,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
        });
        gsap.to(shadowRef.current, {
          x: 0,
          y: 16,
          opacity: 0.25,
          duration: 0.9,
          ease: 'power3.out',
        });
      };


      wrapEl.addEventListener('mousemove', handleMouseMove);
      wrapEl.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        wrapEl.removeEventListener('mousemove', handleMouseMove);
        wrapEl.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative section-min-h-screen lg:section-h-screen lg:min-h-0 bg-ivory overflow-hidden px-[7vw] py-[12vh] lg:pt-[12vh] lg:pb-[6vh]"
    >
      <div className="grid section-min-h-screen lg:min-h-0 lg:h-full grid-cols-1 lg:grid-cols-2 items-center lg:items-start lg:pt-[5vh] gap-[8vw]">

        {/* IMAGE */}
        <div className="relative order-2 lg:order-1">
          <div
            ref={imageWrapRef}
            className="relative w-full max-w-[520px] lg:max-w-[400px] mx-auto"
            style={{ perspective: '900px' }}
          >
            {/* Ambient shadow — sits behind the frame, deepens/shifts
                with the tilt via GSAP below for a physically-attached
                feel rather than a flat static shadow */}
            <div
              ref={shadowRef}
              className="absolute inset-0 translate-y-4 rounded-lg bg-charcoal/25 blur-2xl will-change-transform"
            />

            {/* Outer frame — thin border with breathing room around
                the photo, editorial matting rather than a tight crop */}
            <div className="relative border border-charcoal/15 rounded-lg p-3 lg:p-4 bg-ivory">
              <div
                ref={imageTiltRef}
                className="relative aspect-[4/5] overflow-hidden rounded-[4px] shadow-[0_20px_45px_-15px_rgba(32,29,24,0.35)] will-change-transform"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <img
                  ref={imageRef}
                  src={introImage}
                  alt="Dr. Waiel Awwad"
                  className="w-full h-full object-cover scale-110 will-change-transform"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-ivory/15 via-transparent to-transparent" />
              </div>

              {/* thin gold corner accents on the frame itself */}
              <div className="pointer-events-none absolute left-1 top-1 h-5 w-5 border-l border-t border-gold/70" />
              <div className="pointer-events-none absolute bottom-1 right-1 h-5 w-5 border-b border-r border-gold/70" />
            </div>
          </div>

          {/* small editorial marker */}
          <div
            ref={markerRef}
            className="absolute -bottom-8 left-0 font-mono text-[10px] tracking-[0.25em] uppercase text-stone opacity-0"
          >
            Dr. Waiel Awwad
          </div>
        </div>

        {/* CONTENT */}
        <div className="order-1 lg:order-2">

          <div className="flex items-center gap-3 mb-8 lg:mb-6">
            <span className="w-8 h-px bg-gold" />
            <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-stone">
              Introduction
            </span>
          </div>

          <h2 className="font-display font-normal text-charcoal leading-[0.95] text-[clamp(48px,6.5vw,100px)] lg:text-[clamp(36px,4.5vw,64px)] max-w-[18ch]">
            A voice shaped by the region
            <span className="text-gold italic">
              {' '}he has spent decades observing.
            </span>
          </h2>

          <p className="mt-10 lg:mt-6 max-w-[48ch] text-stone text-[15px] lg:text-[16px] leading-[1.8]">
            From the newsroom to the wider world, Dr. Waiel Awwad has spent
            decades documenting, interpreting, and examining the political
            realities of West Asia.
          </p>

          <p className="mt-5 lg:mt-4 max-w-[48ch] text-stone text-[15px] lg:text-[16px] leading-[1.8]">
            His work has taken him across stories of conflict, diplomacy,
            power, and people — giving him a perspective shaped not only by
            what he has witnessed, but by the region itself.
          </p>

          <div className="mt-12 lg:mt-8">
            <a
              href="/master-profile"
              className="inline-flex items-center gap-4 font-mono text-[11px] tracking-[0.2em] uppercase text-charcoal group"
            >
              <span>Explore Profile</span>

              <span className="flex items-center justify-center w-10 h-10 rounded-full border border-charcoal/20 group-hover:bg-gold group-hover:border-gold transition-all duration-300">
                →
              </span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default IntroductionSection;