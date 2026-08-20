import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import portraitImage from '../assets/portrait.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function MasterProfile() {
  const sectionRef = useRef(null);
  const imageWrapRef = useRef(null);
  const imageTiltRef = useRef(null);
  const imageRef = useRef(null);
  const shadowRef = useRef(null);
  const markerRef = useRef(null);
  const bracketsContainerRef = useRef(null);
  const bracketsContentRef = useRef(null);
  const num1979Ref = useRef(null);
  const num40Ref = useRef(null);
  const highlightsContainerRef = useRef(null);
  const textContainerRef = useRef(null);

  useLayoutEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mql.matches) return;

    const ctx = gsap.context(() => {
      // Bracket scroll-reveal animation
      const containerEl = bracketsContainerRef.current;
      const contentEl = bracketsContentRef.current;
      if (containerEl && contentEl) {
        // Start closed and hidden initially with negative margins to cancel out double flex-gap
        gsap.set(containerEl, { width: 0, opacity: 0, marginLeft: -6, marginRight: -6 });
        gsap.set(contentEl, { width: 0, opacity: 0 });

        // Open quickly when scrolling down (pulling page up towards navbar),
        // reaching full width and opacity before the heading hits the navbar.
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=80', // fully open within 80px of scroll
            scrub: 0.5,
          }
        });

        // 1. Reveal empty brackets () and animate margins to 0
        tl.to(containerEl, {
          opacity: 1,
          width: 'auto',
          marginLeft: 0,
          marginRight: 0,
          duration: 0.35,
          ease: 'none',
        })
        // 2. Expand inner content to push brackets apart
        .to(contentEl, {
          width: 'auto',
          opacity: 1,
          duration: 0.65,
          ease: 'power1.out',
        });
      }

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

      // Slide in from right for the content container
      if (textContainerRef.current) {
        gsap.fromTo(
          textContainerRef.current,
          { x: 80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.4,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
          }
        );
      }

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

      // Highlights reveal and count-up animation
      const highlightsContainer = highlightsContainerRef.current;
      if (highlightsContainer) {
        const highlights = highlightsContainer.children;

        // 1. Reveal cards
        gsap.fromTo(
          highlights,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: highlightsContainer,
              start: 'top 85%',
              toggleActions: 'play none none none',
            }
          }
        );

        // 2. Count up numbers
        const countObj = { val1979: 0, val40: 0 };
        gsap.to(countObj, {
          val1979: 1979,
          val40: 40,
          duration: 2.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: highlightsContainer,
            start: 'top 85%',
          },
          onUpdate: () => {
            if (num1979Ref.current) {
              num1979Ref.current.textContent = Math.floor(countObj.val1979);
            }
            if (num40Ref.current) {
              num40Ref.current.textContent = `${Math.floor(countObj.val40)}+`;
            }
          }
        });
      }

      // Subtle 3D tilt on mouse move
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
    <section ref={sectionRef} className="relative bg-ivory text-charcoal px-[6vw] pt-[14vh] pb-[4vh] overflow-hidden">

      {/* Section heading */}
      <div className="max-w-[1400px] mx-auto">

        <div className="font-mono text-xs tracking-[0.28em] uppercase text-stone mb-6">
          Chapter One
        </div>

        <div className="flex flex-col gap-6 items-start">

          <h2 className="font-display font-normal text-[clamp(36px,7.5vw,110px)] leading-[0.95] tracking-[-0.03em] uppercase text-charcoal flex flex-wrap items-center gap-x-3 gap-y-2 mt-6">
            <span>The Master</span>
            <span ref={bracketsContainerRef} className="inline-flex items-center text-gold select-none">
              <span className="font-serif font-light text-[1.15em] transform -translate-y-[0.04em]">(</span>
              <span
                ref={bracketsContentRef}
                className="overflow-hidden inline-flex flex-col items-center justify-center text-[9px] md:text-[10px] font-mono font-bold tracking-[0.2em] leading-[1.3] text-gold/80 text-center uppercase whitespace-nowrap flex-shrink-0"
              >
                <span className="px-1.5 flex flex-col items-center justify-center py-1 whitespace-nowrap min-w-max flex-shrink-0">
                  <span className="whitespace-nowrap flex-shrink-0">SINCE</span>
                  <span className="text-[8px] opacity-40">——</span>
                  <span className="whitespace-nowrap flex-shrink-0">1979</span>
                </span>
              </span>
              <span className="font-serif font-light text-[1.15em] transform -translate-y-[0.04em]">)</span>
            </span>
            <span>Profile</span>
          </h2>

          <p className="max-w-[46ch] text-stone text-[15px] lg:text-[16px] leading-[1.8] pb-2">
            More than four decades across investigative journalism,
            foreign correspondence, geopolitical analysis and
            international press leadership.
          </p>

        </div>

        {/* Divider */}
        <div className="w-full h-px bg-stone-light/50 mt-5" />

        {/* Profile introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.5fr_1fr_1.5fr] gap-12 lg:gap-16 items-start py-10 lg:py-14">

          <div>
            <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-gold">
              The Person
            </span>
          </div>

          {/* Outer frame & animated portrait */}
          <div className="relative w-full max-w-[320px] lg:max-w-[380px] mx-auto lg:mx-0">
            <div
              ref={imageWrapRef}
              className="relative w-full"
              style={{ perspective: '900px' }}
            >
              {/* Ambient shadow */}
              <div
                ref={shadowRef}
                className="absolute inset-0 translate-y-4 rounded-lg bg-charcoal/25 blur-2xl will-change-transform"
              />

              {/* Outer frame — thin border with breathing room */}
              <div className="relative border border-charcoal/15 rounded-lg p-3 lg:p-4 bg-ivory">
                <div
                  ref={imageTiltRef}
                  className="relative aspect-[4/5] overflow-hidden rounded-[4px] shadow-[0_20px_45px_-15px_rgba(32,29,24,0.35)] will-change-transform"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <img
                    ref={imageRef}
                    src={portraitImage}
                    alt="Dr. Waiel Awwad Portrait"
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

          <div ref={textContainerRef}>
            <h3 className="font-display text-[clamp(32px,4vw,64px)] leading-[1.05] max-w-[16ch]">
              A career shaped by questions, conflict and perspective.
            </h3>

            <p className="mt-8 max-w-[62ch] text-stone text-[15px] lg:text-[16px] leading-[1.85]">
              Dr. Waiel Awwad is a senior foreign journalist and
              investigative correspondent whose career has taken him
              across South Asia, West Asia and other regions at the
              centre of international affairs.
            </p>

            <p className="mt-5 max-w-[62ch] text-stone text-[15px] lg:text-[16px] leading-[1.85]">
              His work spans conflict reporting, international
              journalism, geopolitical analysis and strategic affairs,
              with decades of reporting and commentary on some of the
              world's most consequential events.
            </p>

          </div>

        </div>

        {/* Highlights */}
        <div ref={highlightsContainerRef} className="grid grid-cols-2 lg:grid-cols-4 border-t border-stone-light/50">

          <div className="py-5 lg:py-7 border-r border-stone-light/50">
            <div ref={num1979Ref} className="font-display text-[clamp(38px,4vw,64px)]">
              1979
            </div>
            <div className="font-mono text-[10px] lg:text-xs tracking-[0.18em] uppercase text-stone mt-2">
              Career begins
            </div>
          </div>

          <div className="py-5 lg:py-7 lg:pl-8 lg:border-r border-stone-light/50">
            <div ref={num40Ref} className="font-display text-[clamp(38px,4vw,64px)]">
              40+
            </div>
            <div className="font-mono text-[10px] lg:text-xs tracking-[0.18em] uppercase text-stone mt-2">
              Years of journalism
            </div>
          </div>

          <div className="py-5 lg:py-7 lg:pl-8 border-t lg:border-t-0 border-stone-light/50">
            <div className="font-display text-[clamp(28px,3vw,48px)]">
              West Asia
            </div>
            <div className="font-mono text-[10px] lg:text-xs tracking-[0.18em] uppercase text-stone mt-2">
              Strategic affairs
            </div>
          </div>

          <div className="py-5 lg:py-7 lg:pl-8 border-t lg:border-t-0 lg:border-l border-stone-light/50">
            <div className="font-display text-[clamp(28px,3vw,48px)]">
              Global
            </div>
            <div className="font-mono text-[10px] lg:text-xs tracking-[0.18em] uppercase text-stone mt-2">
              Press leadership
            </div>
          </div>

        </div>


      </div>
    </section>
  );
}