'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import cameraImage from '../assets/camera.webp';
import conferenceImage from '../assets/image12.jpg';
import interviewImage from '../assets/interview.jpg';
import podiumImage from '../assets/20.jpeg';

gsap.registerPlugin(ScrollTrigger);

const CAREER_ROLES = [
  {
    number: '01',
    title: 'Investigative Journalist',
    description:
      'A career rooted in observing events closely, asking difficult questions, and reporting from the ground.',
    category: 'REPORTING',
    period: 'EARLY YEARS',
    image: cameraImage,
    positionClass: 'object-center',
  },
  {
    number: '02',
    title: 'Foreign Correspondent',
    description:
      'Years of reporting from a region where politics, conflict, diplomacy, and human stories constantly intersect.',
    category: 'CORRESPONDENCE',
    period: 'FIELD REPORTING',
    image: conferenceImage,
    positionClass: 'object-center',
  },
  {
    number: '03',
    title: 'West Asia Strategist',
    description:
      'A perspective shaped by decades of studying the region and understanding the forces behind its changing political landscape.',
    category: 'REGIONAL AFFAIRS',
    period: 'WEST ASIA',
    image: podiumImage,
    positionClass: 'object-left',
  },
  {
    number: '04',
    title: 'Geopolitical Analyst',
    description:
      'Connecting events, history, power, and policy to make sense of a region that continues to shape global affairs.',
    category: 'GEOPOLITICS',
    period: 'ANALYSIS',
    image: interviewImage,
    positionClass: 'object-center',
  },
];

const CareerPreview = () => {
  const sectionRef = useRef(null);
  const labelLineRef = useRef(null);
  const headingRef = useRef(null);
  const subCopyRef = useRef(null);
  const rowRefs = useRef([]);
  const ctaRef = useRef(null);
  const imageWrapRef = useRef(null);
  const imageRef = useRef(null);
  const curtainRef = useRef(null); // replaces clip-path wipe
  const metaCategoryRef = useRef(null);
  const metaPeriodRef = useRef(null);
  const railRef = useRef(null);
  const railFillRef = useRef(null);
  const rowsContainerRef = useRef(null);
  const imageTlRef = useRef(null); // holds the active image-change timeline, so rapid hovers don't stack

  const [activeRole, setActiveRole] = useState(null);
  const [cardTop, setCardTop] = useState(0);

  useLayoutEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mql.matches) return;

    const ctx = gsap.context(() => {
      /* TOP LABEL */
      gsap.fromTo(
        labelLineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: 'power2.out',
          transformOrigin: 'left center',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );

      /* HEADING & INTRO COPY */
      const headingLines = headingRef.current.querySelectorAll('.reveal-line-inner');
      const introTl = gsap.timeline({
        scrollTrigger: { trigger: headingRef.current, start: 'top 85%' }
      });

      introTl.fromTo(
        headingLines,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.1,
          ease: 'power3.out',
          stagger: 0.12,
        }
      )
      .fromTo(
        subCopyRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.6'
      );

      /* PROGRESS RAIL — draws in alongside the archive list */
      gsap.fromTo(
        railFillRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.2,
          ease: 'power2.out',
          transformOrigin: 'top center',
          scrollTrigger: { trigger: railRef.current, start: 'top 85%' },
        }
      );

      /* CAREER ROWS — richer stagger, ghost number scales in behind */
      rowRefs.current.forEach((row) => {
        if (!row) return;

        const number = row.querySelector('.role-number');
        const ghostNumber = row.querySelector('.role-number-ghost');
        const title = row.querySelector('.role-title-inner');
        const desc = row.querySelector('.role-desc');
        const line = row.querySelector('.row-divider');

        const tl = gsap.timeline({
          scrollTrigger: { trigger: row, start: 'top 88%' },
        });

        tl.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: 'power2.out' }, 0)
          .fromTo(
            ghostNumber,
            { opacity: 0, scale: 0.8, xPercent: 10 },
            { opacity: 1, scale: 1, xPercent: 0, duration: 1, ease: 'power3.out' },
            0.05
          )
          .fromTo(title, { yPercent: 100 }, { yPercent: 0, duration: 0.9, ease: 'power3.out' }, 0.1)
          .fromTo(number, { opacity: 0, x: -8 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }, 0.25)
          .fromTo(desc, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 0.3);
      });

      /* CTA */
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 92%' },
        }
      );
    }, sectionRef);

    const handleClickOutside = (e) => {
      if (rowsContainerRef.current && !rowsContainerRef.current.contains(e.target)) {
        setActiveRole(null);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      imageTlRef.current?.kill();
      ctx.revert();
    };
  }, []);

  /* IMAGE CHANGE ANIMATION — curtain reveal (transform-based, not
     clip-path) + subtle zoom + meta crossfade.

     Rationale for the curtain swap: clip-path animation forces the
     browser to repaint every frame since it isn't a compositor-only
     property like transform/opacity. A solid panel that slides away
     via translateY produces the same "wipe reveal" look but is fully
     GPU-composited, so it's far cheaper — same fix pattern as
     replacing animated box-shadow with an opacity-crossfaded layer
     in the At a Glance section. */
  const changeRole = (index) => {
    if (index === activeRole) return;

    if (window.innerWidth < 990) {
      setActiveRole(index);
      return;
    }

    // Kill any in-flight image-change timeline before starting a new one
    imageTlRef.current?.kill();

    const tl = gsap.timeline();
    imageTlRef.current = tl;

    // Calculate vertical position of the hovered row relative to the section
    if (sectionRef.current && rowRefs.current[index]) {
      const zoom = parseFloat(document.documentElement.style.zoom) || 1;
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const rowRect = rowRefs.current[index].getBoundingClientRect();
      
      const sectionHeight = sectionRect.height / zoom;
      const rowTop = rowRect.top / zoom;
      const sectionTop = sectionRect.top / zoom;
      const rowHeight = rowRect.height / zoom;

      const cardHeight = (imageWrapRef.current && imageWrapRef.current.offsetHeight) || 480;
      const rowCenter = (rowTop - sectionTop) + (rowHeight / 2);
      
      let targetTop = rowCenter - (cardHeight / 2);
      
      // Constrain within section padding limits so it never gets cut off
      const minTop = 60;
      const maxTop = sectionHeight - cardHeight - 60;
      
      const constrainedTop = Math.max(minTop, Math.min(targetTop, Math.max(minTop, maxTop)));
      setCardTop(constrainedTop);
    }

    if (activeRole === null) {
      setActiveRole(index);
      tl.set(curtainRef.current, { yPercent: 0 })
        .to(curtainRef.current, { yPercent: -100, duration: 0.75, ease: 'power3.out' }, 0)
        .fromTo(
          [metaCategoryRef.current, metaPeriodRef.current],
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.08 },
          0.3
        );
    } else {
      // Force curtain to -100 if it was interrupted during rapid hover switching
      gsap.to(curtainRef.current, { yPercent: -100, duration: 0.3, ease: 'power2.out' });

      tl.to([metaCategoryRef.current, metaPeriodRef.current], { opacity: 0, y: -6, duration: 0.2 }, 0)
        .call(() => setActiveRole(index))
        .fromTo(
          [metaCategoryRef.current, metaPeriodRef.current],
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', stagger: 0.06 },
          0.15
        );
    }
  };

  const hideRole = () => {
    setActiveRole(null);
    imageTlRef.current?.kill();
    gsap.set(curtainRef.current, { yPercent: 0 });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-charcoal px-[7vw] py-[10vh] text-ivory"
    >
      {/* FLOATING CARD CONTAINER */}
      <div
        ref={imageWrapRef}
        className={`pointer-events-none absolute right-[6vw] z-20 hidden w-[32vw] max-w-[480px] min-[990px]:block transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
          activeRole !== null ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        style={{ top: `${cardTop}px` }}
      >
        <div className="group bg-[#161716] rounded-[20px] p-5 border border-gold/15 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col text-ivory">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[16px] bg-charcoal flex items-center justify-center border border-white/[0.05]">
            {CAREER_ROLES.map((role, i) => (
              <img
                key={role.number}
                src={role.image}
                alt={role.title}
                loading="eager"
                decoding="async"
                className={`absolute inset-0 h-full w-full object-cover ${role.positionClass || 'object-center'} transition-all duration-500 ease-out ${
                  activeRole === i
                    ? 'opacity-100 scale-100 z-10'
                    : 'opacity-0 scale-105 z-0 pointer-events-none'
                }`}
              />
            ))}

            {/* Curtain — solid panel covering the image, slides up via translateY on first reveal */}
            <div
              ref={curtainRef}
              className="pointer-events-none absolute inset-0 z-20 bg-[#161716] will-change-transform"
            />
          </div>

          {/* Info block similar to gallery caption */}
          <div className="mt-4 flex flex-col items-center text-center">
            <p ref={metaCategoryRef} className="font-mono text-[10px] tracking-[0.3em] text-gold uppercase mb-1 font-semibold">
              {activeRole !== null ? CAREER_ROLES[activeRole].category : ''}
            </p>
            <h3 className="font-sans text-ivory text-[1.15rem] font-semibold mb-1 line-clamp-1">
              {activeRole !== null ? CAREER_ROLES[activeRole].title : ''}
            </h3>
            <p ref={metaPeriodRef} className="font-mono text-[9px] tracking-[0.25em] text-ivory/60 uppercase">
              {activeRole !== null ? CAREER_ROLES[activeRole].period : ''}
            </p>
          </div>
        </div>
      </div>

      {/* TOP LABEL */}
      <div className="relative z-10 mb-[6vh] flex items-center gap-3">
        <span ref={labelLineRef} className="h-px w-8 origin-left bg-gold" />
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ivory/60">
          The Work
        </span>
      </div>

      {/* INTRO */}
      <div className="relative z-10 mb-[7vh] grid grid-cols-1 gap-[8vw] min-[990px]:grid-cols-[1fr_0.8fr]">
        <div ref={headingRef}>
          <h2 className="max-w-[12ch] font-display text-[clamp(38px,5vw,72px)] font-normal leading-[1.1] tracking-[-0.02em]">
            <span className="block overflow-hidden py-2 -my-2">
              <span className="reveal-line-inner block will-change-transform">
                A career built
              </span>
            </span>
            <span className="block overflow-hidden text-gold py-3 -my-3">
              <span className="reveal-line-inner block italic will-change-transform">
                around the story.
              </span>
            </span>
          </h2>
        </div>

        <div ref={subCopyRef} className="max-w-[40ch] self-end opacity-0">
          <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
            Four decades of perspective
          </p>
          <p className="text-[15px] leading-[1.8] text-ivory/65 min-[990px]:text-[16px]">
            Journalism became the lens through which Dr. Waiel Awwad
            observed the region — eventually shaping a broader body of
            work around West Asian politics, conflict, diplomacy and
            geopolitics.
          </p>
        </div>
      </div>

      {/* CAREER ARCHIVE — with progress rail on the left */}
      <div className="relative z-10 flex gap-6 min-[990px]:gap-10">
        {/* Progress rail */}
        <div
          ref={railRef}
          className="relative hidden w-px shrink-0 self-stretch bg-ivory/10 min-[990px]:block"
        >
          <div
            ref={railFillRef}
            className="absolute left-0 top-0 h-full w-full origin-top bg-gold"
          />
        </div>

        <div ref={rowsContainerRef} className="flex-1 border-t border-ivory/15" onMouseLeave={hideRole}>
          {CAREER_ROLES.map((role, i) => {
            const isActive = activeRole === i;

            return (
              <div
                key={role.number}
                ref={(el) => (rowRefs.current[i] = el)}
                onMouseEnter={() => changeRole(i)}
                onClick={() => changeRole(i)}
                className="group relative cursor-pointer overflow-hidden border-b border-ivory/15 py-6 transition-all duration-500 min-[990px]:py-7 min-[990px]:pr-[38%]"
              >
                {/* row-local divider draw-in on scroll entrance */}
                <span className="row-divider absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-ivory/15" />

                {/* Ghost oversized number — premium editorial texture */}
                <span
                  className="role-number-ghost pointer-events-none absolute -top-2 left-[70px] select-none font-display text-[clamp(90px,10vw,160px)] leading-none text-ivory/[0.035] min-[990px]:left-[90px]"
                  aria-hidden="true"
                >
                  {role.number}
                </span>

                <div className="relative grid grid-cols-[50px_1fr] gap-6 min-[990px]:grid-cols-[80px_1.5fr_0.8fr] min-[990px]:gap-10">
                  {/* ACTIVE GOLD LINE */}
                  <span
                    className={`absolute left-0 top-0 h-full w-[2px] origin-top bg-gold transition-transform duration-500 ${
                      isActive ? 'scale-y-100' : 'scale-y-0'
                    }`}
                  />

                  {/* NUMBER */}
                  <div className="role-number pt-2 font-mono text-[10px] tracking-[0.15em] text-ivory/30 opacity-0">
                    {role.number}
                  </div>

                  {/* TITLE */}
                  <div className="overflow-hidden py-3 -my-3">
                    <h3
                      className={`role-title-inner font-display text-[clamp(24px,3.2vw,48px)] font-normal leading-[1.2] transition-all duration-500 will-change-transform ${
                        isActive ? 'translate-x-3 text-gold' : 'text-ivory'
                      }`}
                    >
                      {role.title}
                    </h3>

                    {/* MOBILE DESCRIPTION & IMAGE */}
                    <div className="min-[990px]:hidden">
                      <p className="role-desc mt-3 block max-w-[38ch] text-[13px] leading-[1.7] text-ivory/45">
                        {role.description}
                      </p>
                      <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${
                          isActive
                            ? 'max-h-[600px] opacity-100 scale-100 mt-4'
                            : 'max-h-0 opacity-0 scale-95 pointer-events-none mt-0'
                        }`}
                      >
                        <div className="bg-[#161716] rounded-[16px] p-3 border border-gold/15 shadow-lg flex flex-col text-ivory max-w-[420px]">
                          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[12px] bg-charcoal flex items-center justify-center border border-white/[0.05]">
                            <img
                              src={role.image}
                              alt={role.title}
                              loading="lazy"
                              decoding="async"
                              className={`h-full w-full object-cover ${role.positionClass || 'object-center'}`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* DESKTOP DESCRIPTION */}
                  <p className="role-desc hidden max-w-[38ch] text-[14px] leading-[1.7] text-ivory/45 min-[990px]:block">
                    {role.description}
                  </p>

                  {/* ARCHIVE MARK */}
                  <div
                    className={`absolute right-3 top-1/2 hidden -translate-y-1/2 font-mono text-[8px] tracking-[0.2em] transition-all duration-500 min-[990px]:block ${
                      isActive ? 'translate-x-0 opacity-60' : 'translate-x-3 opacity-0'
                    }`}
                  >
                    VIEW
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div ref={ctaRef} className="relative z-10 mt-10 flex justify-end opacity-0">
        <Link to="/gallery" className="group flex items-center gap-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em]">
            Explore Gallery
          </span>
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-ivory/25 transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-charcoal">
            →
          </span>
        </Link>
      </div>
    </section>
  );
};

export default CareerPreview;