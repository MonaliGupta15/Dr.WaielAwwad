'use client';

/**
 * HeroSection.jsx — Editorial/cinematic hero, Jean Rottner composition
 * ---------------------------------------------------------------
 * Layout: Tailwind. Choreography: GSAP + ScrollTrigger.
 *
 * Portrait treatment: transparent PNG cutout, lightly graded to sit
 * in the navy/gold world. Grain sits ABOVE the portrait so texture is
 * unified across bg + photo. A soft navy wash eases in near the end
 * of the pin as a considered hand-off. On desktop, a circular reveal
 * (clip-path: circle()) uncovers IntroductionSection mid-pin.
 * ---------------------------------------------------------------
 */

import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroImage from '../assets/hero.png';
import IntroductionSection from './IntroductionSection';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const rootRef = useRef(null);
  const viewportRef = useRef(null);
  const portraitWrapRef = useRef(null);
  const eyebrowRef = useRef(null);
  const wordWaielRef = useRef(null);
  const wordAwwadRef = useRef(null);
  const labelRef = useRef(null);
  const scrollCueRef = useRef(null);
  const transitionWashRef = useRef(null);
  const revealRef = useRef(null);

  const [reduceMotion, setReduceMotion] = useState(false);

  useLayoutEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mql.matches);
  }, []);

  useLayoutEffect(() => {
    if (reduceMotion) return;

    const setVh = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);

    const isSmall = window.innerWidth < 1024 || window.innerHeight > window.innerWidth;
    const shear = isSmall ? 0.45 : 1;

    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      const setupAnimations = (isDesktop) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: viewportRef.current,
            start: 'top top',
            end: '+=180%',
            scrub: 1.2,
            pin: true,
          },
        });

        const dur = 0.45;

        tl.to(scrollCueRef.current, { opacity: 0, duration: 0.08 }, 0);
        tl.to(wordWaielRef.current, { xPercent: 34 * shear, duration: dur, ease: 'none' }, 0);
        tl.to(wordAwwadRef.current, { xPercent: -46 * shear, duration: dur, ease: 'none' }, 0);
        tl.to(
          portraitWrapRef.current,
          { xPercent: 10 * shear, yPercent: -6 * shear, scale: 1.04, duration: dur, ease: 'none' },
          0
        );
        tl.to(eyebrowRef.current, { xPercent: 8 * shear, duration: dur, ease: 'none' }, 0);
        tl.to(labelRef.current, { xPercent: -8 * shear, duration: dur, ease: 'none' }, 0);
        tl.to(
          [eyebrowRef.current, labelRef.current],
          { opacity: 0, duration: 0.15 },
          0.35
        );

        // Circular reveal — explicit center coordinate (50% 100% =
        // bottom-center of the full-bleed section), grown via a
        // radius percentage. 150% safely overshoots the viewport
        // diagonal from a bottom-center origin so full coverage is
        // guaranteed at any aspect ratio, without needing an exact
        // diagonal calculation.
        tl.fromTo(
          revealRef.current,
          { clipPath: 'circle(0% at 50% 100%)' },
          { clipPath: 'circle(150% at 50% 100%)', duration: 0.55, ease: 'power1.inOut' },
          0.45
        );
      };

      mm.add('(min-width: 1024px)', () => setupAnimations(true));
      mm.add('(max-width: 1023px)', () => setupAnimations(false));
    }, rootRef);

    return () => {
      window.removeEventListener('resize', setVh);
      ctx.revert();
    };
  }, [reduceMotion]);

  return (
    <div ref={rootRef}>
      <section
        ref={viewportRef}
        className="relative w-full section-h-screen overflow-hidden bg-navy-abyss"
      >
        {/* Layer 1 — background */}
        <div className="absolute inset-0 z-0 bg-hero-navy" />

        {/* Layer 2 — portrait, transparent PNG cutout */}
        <div
          ref={portraitWrapRef}
          className="absolute inset-0 z-[2] flex items-end justify-end pointer-events-none will-change-transform"
        >
          <div className="relative h-[88%] lg:h-[104%] portrait:h-[88%] mr-[-23vh] sm:mr-[-10vw] lg:mr-[4vw] md:portrait:mr-[-22vw]">
            <img
              src={heroImage}
              alt="Dr. Waiel Awwad"
              className="hero-portrait h-full w-auto max-w-none object-contain object-bottom select-none"
              draggable={false}
            />
          </div>
        </div>

        {/* Layer 3 — grain, ABOVE the portrait so texture is unified
            across background + photo instead of only sitting on the bg */}
        <div className="absolute inset-0 z-[6] pointer-events-none opacity-[0.1] mix-blend-overlay bg-grain" />

        {/* Eyebrow */}
        <div
          ref={eyebrowRef}
          className="absolute top-[24%] left-[8.5%] lg:top-[19%] lg:left-[7%] portrait:top-[24%] portrait:left-[8.5%] z-20 will-change-transform"
        >
          <span className="block font-mono text-[10px] lg:text-xs tracking-[0.3em] uppercase text-ivory/60 mb-2">
            West Asian Strategist
          </span>
          <div className="w-8 h-px bg-gold/70" />
        </div>

        {/* Layer — oversized typography, sheared horizontally, overlapping the portrait */}
        <div className="absolute inset-0 z-[15] overflow-hidden pointer-events-none">
          <div
            ref={wordWaielRef}
            className="absolute top-[48%] left-[3.5%] lg:top-[25%] lg:left-[5%] portrait:top-[48%] portrait:left-[3.5%] will-change-transform"
          >
            <span className="block font-display italic font-light text-[clamp(20px,2.4vw,38px)] text-ivory/90 mb-1 lg:mb-2 pl-[6%] lg:pl-[1%]">
              Dr.
            </span>
            <h1 className="font-display font-normal text-[clamp(60px,12vw,120px)] lg:text-[clamp(72px,17vw,260px)] leading-[0.8] tracking-[-0.015em] text-ivory whitespace-nowrap">
              WAIEL
            </h1>
          </div>

          <div
            ref={wordAwwadRef}
            className="absolute top-[calc(48%+clamp(105px,17.5vw,240px))] left-[12%] lg:top-auto lg:bottom-[12%] lg:left-[24%] portrait:top-[calc(48%+clamp(105px,17.5vw,240px))] portrait:bottom-auto portrait:left-[12%] will-change-transform"
          >
            <h1 className="font-display italic font-light text-[clamp(60px,12vw,120px)] lg:text-[clamp(72px,17vw,260px)] leading-[0.8] tracking-[-0.015em] text-gold whitespace-nowrap">
              AWWAD
            </h1>
          </div>
        </div>

        {/* Supporting label */}
        <div
          ref={labelRef}
          className="absolute bottom-[5%] right-[6%] lg:bottom-[3.5%] lg:right-[8%] z-20 text-right will-change-transform"
        >
          <span className="block font-mono text-[10px] lg:text-[11px] tracking-[0.24em] uppercase text-ivory/70">
            Dr. Waiel Awwad
          </span>
          <span className="block font-mono text-[10px] lg:text-[11px] tracking-[0.24em] uppercase text-gold/80 mt-1">
            Leadership • Diplomacy • Service
          </span>
        </div>

        {/* Scroll cue */}
        <div
          ref={scrollCueRef}
          className="absolute bottom-[4%] left-[6%] z-25 flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] uppercase text-ivory/70"
        >
          <div className="w-px h-[38px] bg-ivory/30 relative overflow-hidden">
            <div className="absolute -top-full left-0 w-full h-full bg-green animate-scroll-pulse" />
          </div>
          <span>Scroll</span>
        </div>

        {/* Considered hand-off — deepens into pure navy near the end
            of the pin so the release into the next section isn't a
            hard cut. Uses only Hero-local color tokens. */}
        <div
          ref={transitionWashRef}
          className="absolute inset-0 z-[25] pointer-events-none opacity-0"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, var(--color-navy-abyss) 100%)',
          }}
        />

        {/* Semicircle Reveal Transition of IntroductionSection —
            clip-path circle() with an explicit center coordinate, so
            the horizontal center is always true regardless of the
            box's width/height ratio. absolute inset-0 on this
            full-width viewportRef section guarantees 50% here means
            true screen-center. */}
        <div
          ref={revealRef}
          className="absolute inset-0 z-[30] w-full h-full overflow-hidden"
          style={{
            clipPath: 'circle(0% at 50% 100%)',
          }}
        >
          <IntroductionSection />
        </div>
      </section>
    </div>
  );
}