'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import originImg from '../assets/portrait.jpg';
import educationImg from '../assets/Waiel-awwad.jpg';
import fieldImg from '../assets/camera.webp';
import broadcastImg from '../assets/interview.jpg';
import leadershipImg from '../assets/conference.jpg';
import strategistImg from '../assets/podium.jpg';
import finalImg from '../assets/3.jpg';

gsap.registerPlugin(ScrollTrigger);

const CHAPTERS = [
  {
    number: '01',
    label: 'ORIGIN',
    title: ['FROM', 'SYRIA', 'TO INDIA'],
    body: 'Dr. Waiel S.H. Awwad is Syrian-born and has been based in South Asia since 1979. His early journey brought him to India for his studies, where his professional life eventually expanded far beyond journalism.',
    image: originImg,
    keywords: [],
    objectPosition: '50% 20%',
  },
  {
    number: '02',
    label: 'EDUCATION',
    title: ['THE MAKING', 'OF A', 'JOURNALIST'],
    body: 'He graduated from Delhi University with an MBBS and later pursued postgraduate studies in journalism, along with programmes in international law, human rights, diplomatic correspondence and video journalism in Delhi, London and Dubai.',
    image: educationImg,
    keywords: ['MEDICINE', 'JOURNALISM', 'LAW', 'HUMAN RIGHTS', 'DIPLOMACY'],
    objectPosition: '50% 20%',
  },
  {
    number: '03',
    label: 'THE FIELD',
    title: ['1979', '—', 'THE FIELD BEGINS'],
    body: 'His South Asia-based journalism career dates to 1979. Over the decades he travelled extensively across South and Southeast Asia and reported from Sri Lanka, Kashmir, Afghanistan, West Asia and the Gulf.',
    image: fieldImg,
    keywords: [],
    objectPosition: '18% 28%',
  },
  {
    number: '04',
    label: 'THE FRONTLINES',
    title: ['WHERE REPORTING', 'BECAME', 'PRESENCE'],
    body: 'He worked as a war correspondent in conflict zones. He was detained in Afghanistan before the fall of the Taliban government and, during the 2003 Iraq invasion, was captured in an ambush while embedded with American troops.',
    image: finalImg,
    keywords: ['JAFFNA', 'KARGIL', 'AFGHANISTAN', 'IRAQ'],
    objectPosition: '36% 22%',
  },
  {
    number: '05',
    label: 'BROADCAST',
    title: ['FROM THE FIELD', 'TO THE', 'WORLD'],
    body: 'He worked with MBC in London, MBC FM Radio in Kuwait, Oman and Damascus Radio, and ran "Dateline South Asia", an Arabic programme created in partnership with Asian News International. He later served as South Asia Bureau Chief of Al Arabiya TV in Dubai Media City.',
    image: broadcastImg,
    keywords: [],
    objectPosition: '65% 25%',
  },
  {
    number: '06',
    label: 'PUBLIC VOICE',
    title: ['WHEN THE', 'JOURNALIST', 'BECAME A LEADER'],
    body: 'He has served multiple terms as President of the Foreign Correspondents’ Club of South Asia, including terms recorded for 2003–05 and 2013–15. He was elected again for the 2025–27 term.',
    image: leadershipImg,
    keywords: ['FCC', 'PRESS CLUBS', 'MEDIA LEADERSHIP', 'PUBLIC SERVICE'],
    objectPosition: '41% 40%',
  },
  {
    number: '07',
    label: 'STRATEGIST',
    title: ['BEYOND', 'THE', 'HEADLINE'],
    body: 'His work now extends beyond reporting into geopolitical analysis, with a focus on West Asia, South Asia, conflict, diplomacy and international affairs. His biography also lists advisory/fellowship roles connected with the Tillotoma Foundation, Global Counter Terrorism Council, International Strategic Institute in Rome and Indo-Arab Intellectual Forum. In September 2025, while President of the Foreign Correspondents\' Club of South Asia, he assumed the presidency of the International Association of Press Clubs.',
    image: strategistImg,
    keywords: [],
    objectPosition: '50% 25%',
  },
];

const RING_BASE_RADII = [60, 120, 180, 245, 315, 390, 470];
const circlePathD = (r) => `M 0,-${r} A ${r},${r} 0 1,1 0,${r} A ${r},${r} 0 1,1 0,-${r}`;

export default function AboutSection() {
  const rootRef = useRef(null);
  const pinRef = useRef(null);
  const tunnelGroupRef = useRef(null);
  const ringGroupRefs = useRef([]);
  const ringTextRefs = useRef([]);
  const centerCircleRef = useRef(null);
  const chapterContentRefs = useRef([]);
  const progressLabelRef = useRef(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  const chapterImageRefs = useRef([]);
  const chapterTextRefs = useRef([]);
  const [imageMetrics, setImageMetrics] = useState(null);
  
  const introPortalRef = useRef(null);
  const introBracketRef = useRef(null);

  const finalPortalRef = useRef(null);
  const finalHeadingRef = useRef(null);
  const finalQuoteRef = useRef(null);
  const finalDotRef = useRef(null);

  useLayoutEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mql.matches);
  }, []);

  // 1. Measure image positions dynamically for circular transitions
  useLayoutEffect(() => {
    if (reduceMotion) return;

    const measure = () => {
      const imgEl = chapterImageRefs.current[0];
      const portalEl = chapterContentRefs.current[0];
      if (imgEl && portalEl && pinRef.current) {
        // Temporarily reset portal styling to measure un-transformed coordinates
        const originalStyle = portalEl.style.cssText;
        portalEl.style.transform = 'none';
        portalEl.style.webkitTransform = 'none';

        const rect = imgEl.getBoundingClientRect();
        const parentRect = pinRef.current.getBoundingClientRect();

        const cx = rect.left - parentRect.left + rect.width / 2;
        const cy = rect.top - parentRect.top + rect.height / 2;
        const r = Math.min(rect.width, rect.height) / 2;
        const rCover = Math.hypot(rect.width / 2, rect.height / 2);

        const vw = parentRect.width;
        const vh = parentRect.height;
        const maxR = Math.hypot(vw / 2, vh / 2); // Center of viewport

        // Restore original styling
        portalEl.style.cssText = originalStyle;

        setImageMetrics({ cx, cy, r, rCover, maxR });
      }
    };

    const timer = setTimeout(measure, 150);
    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', measure);
    };
  }, [reduceMotion]);

  useLayoutEffect(() => {
    if (reduceMotion || !imageMetrics) return;

    // Dynamically calculate labels to repeat around each ring path
    for (let i = 0; i < 7; i++) {
      if (!ringTextRefs.current[i]) continue;
      const chapter = CHAPTERS[6 - i];
      const labelText = `· ${chapter.title.join(' ').toUpperCase()} `;
      const circumference = 2 * Math.PI * RING_BASE_RADII[i];
      const textLengthApprox = labelText.length * 6.5; 
      const repeats = Math.max(2, Math.ceil(circumference / textLengthApprox));
      ringTextRefs.current[i].textContent = labelText.repeat(repeats);
    }

    const isSmall = window.innerWidth < 1024;
    const scrollLength = isSmall ? '450%' : '650%';

    const ctx = gsap.context(() => {
      const segment = 1 / 10;

      // 1. Core scroll-driven timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: 'top top',
          end: `+=${scrollLength}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const activeIndex = Math.min(9, Math.floor(progress / segment));
            if (progressLabelRef.current) {
              if (activeIndex >= 2 && activeIndex < 9) {
                const chapter = CHAPTERS[activeIndex - 2];
                progressLabelRef.current.textContent = `${chapter.number} / 07 — ${chapter.label}`;
              } else if (activeIndex >= 9) {
                progressLabelRef.current.textContent = 'THE JOURNEY CONTINUES';
              } else {
                progressLabelRef.current.textContent = 'THE LAYERS OF A LIFE';
              }
            }
          },
        },
      });

      // 2. CONTINUOUS SCROLL-DRIVEN ROTATION (No global scale zoom, keep it stable at 1.0)
      if (tunnelGroupRef.current) {
        tl.fromTo(
          tunnelGroupRef.current,
          { rotate: 0, transformOrigin: '50% 50%' },
          { rotate: 55, transformOrigin: '50% 50%', ease: 'none', duration: 0.94 },
          0
        );
      }

      // 3. HYPNOTIC COUNTER-ROTATION
      ringGroupRefs.current.forEach((ring, ringIndex) => {
        if (!ring) return;
        const direction = ringIndex % 2 === 0 ? 1 : -1;
        const spinSpeed = 50 + ringIndex * 25;
        tl.fromTo(
          ring,
          { rotate: 0, transformOrigin: '50% 50%' },
          {
            rotate: direction * spinSpeed,
            transformOrigin: '50% 50%',
            ease: 'none',
            duration: 0.94,
          },
          0
        );
      });

      // 4. DISSOLVING THE GOLD CORE (Fades out completely during the intro sequence before Chapter 1 enters)
      if (centerCircleRef.current) {
        gsap.set(centerCircleRef.current, { opacity: 1, transformOrigin: '50% 50%' });
        tl.to(
          centerCircleRef.current,
          {
            scale: 6,
            opacity: 0,
            transformOrigin: '50% 50%',
            ease: 'power2.inOut',
            duration: 2.0 * segment,
          },
          0
        );
      }

      // 5. PROGRESS CONTENT TRANSITIONS WITH CIRCULAR REVEALS (10 States)

      // Initialize starting state for Intro Screen (State 0)
      if (introPortalRef.current) {
        gsap.set(introPortalRef.current, { opacity: 1, scale: 1, y: 0 });
      }
      if (introBracketRef.current) {
        gsap.set(introBracketRef.current, { width: 0, opacity: 0, scale: 0.75 });
      }

      // Initialize all chapter portals to be hidden initially
      for (let i = 0; i < 7; i++) {
        const portal = chapterContentRefs.current[i];
        if (portal) {
          gsap.set(portal, {
            opacity: 0
          });
        }
        if (chapterTextRefs.current[i]) {
          gsap.set(chapterTextRefs.current[i], { opacity: 0, y: 35 });
        }
        if (chapterImageRefs.current[i]) {
          const img = chapterImageRefs.current[i].querySelector('img');
          gsap.set(chapterImageRefs.current[i], { opacity: 0 });
          if (img) {
            gsap.set(img, { scale: 1.05 });
          }
        }
      }

      // Initialize final screen elements
      if (finalPortalRef.current) {
        gsap.set(finalPortalRef.current, { opacity: 0 });
      }
      if (finalHeadingRef.current) {
        gsap.set(finalHeadingRef.current, { opacity: 0, y: 30 });
      }
      if (finalDotRef.current) {
        gsap.set(finalDotRef.current, { opacity: 0, scale: 0.7 });
      }
      if (finalQuoteRef.current) {
        gsap.set(finalQuoteRef.current, { opacity: 0, y: 15 });
      }

      // Initialize all concentric rings to be visible initially at scale 1
      ringGroupRefs.current.forEach((ring) => {
        if (ring) {
          gsap.set(ring, { scale: 1, opacity: 1, transformOrigin: '50% 50%' });
        }
      });

      // --- INTRO SCREEN TRANSITIONS ---
      // 1. Bracket comes in (State 0 -> State 1)
      const bracketStart = 0.4 * segment;
      const bracketEnd = 1.0 * segment;
      if (introBracketRef.current) {
        tl.to(
          introBracketRef.current,
          {
            width: 'auto',
            opacity: 1,
            scale: 1,
            duration: bracketEnd - bracketStart,
            ease: 'power3.out'
          },
          bracketStart
        );
      }

      // 2. Intro Screen Exits & Chapter 1 Enters (State 1 -> State 2)
      const introExitStart = 1.4 * segment;
      const introExitEnd = 2.0 * segment;

      if (introPortalRef.current) {
        tl.to(
          introPortalRef.current,
          {
            opacity: 0,
            scale: 0.96,
            y: -30,
            duration: introExitEnd - introExitStart,
            ease: 'power3.in'
          },
          introExitStart
        );
      }

      // Chapter 1 Portal Entrance (State 2)
      const ch1Portal = chapterContentRefs.current[0];
      const ch1Text = chapterTextRefs.current[0];
      const ch1Img = chapterImageRefs.current[0];

      if (ch1Portal) {
        tl.set(ch1Portal, { opacity: 1 }, introExitStart);
        if (ch1Img) {
          tl.fromTo(
            ch1Img,
            { opacity: 0 },
            { opacity: 1, duration: introExitEnd - introExitStart, ease: 'power2.out' },
            introExitStart
          );
          const img = ch1Img.querySelector('img');
          if (img) {
            tl.to(img, { scale: 1.0, duration: introExitEnd - introExitStart, ease: 'power2.out' }, introExitStart);
          }
        }
        if (ch1Text) {
          tl.to(ch1Text, { opacity: 1, y: 0, duration: introExitEnd - introExitStart, ease: 'power2.out' }, introExitStart);
        }
      }

      // Build transition sequence between chapters (Chapters 1 -> 7)
      for (let i = 0; i < 7; i++) {
        // --- RING ANIMATIONS ---
        const ringIndex = 6 - i; // Outermost ring exits first, innermost exits last
        const ring = ringGroupRefs.current[ringIndex];
        const ringCircle = ring?.querySelector('circle');
        
        if (ring) {
          // 1. Glow Accents: active ring turns gold softly
          if (ringCircle) {
            if (i === 0) {
              gsap.set(ringCircle, { stroke: '#c5a880', strokeOpacity: 0.25, strokeWidth: 1.0 });
              tl.to(
                ringCircle,
                {
                  stroke: 'var(--color-ivory)',
                  strokeOpacity: 0.08,
                  strokeWidth: 0.8,
                  duration: 0.18 * segment,
                  ease: 'power2.in'
                },
                2.6 * segment
              );
            } else {
              const glowStart = (i + 2 - 0.4) * segment;
              const glowEnd = (i + 2 + 0.1) * segment;
              gsap.set(ringCircle, { stroke: 'var(--color-ivory)', strokeOpacity: 0.08, strokeWidth: 0.8 });
              
              tl.to(
                ringCircle,
                {
                  stroke: '#c5a880',
                  strokeOpacity: 0.25,
                  strokeWidth: 1.0,
                  duration: glowEnd - glowStart,
                  ease: 'power2.out'
                },
                glowStart
              );

              if (i < 6) {
                const fadeStart = (i + 2 + 0.6) * segment;
                const fadeEnd = (i + 2 + 1.2) * segment;
                tl.to(
                  ringCircle,
                  {
                    stroke: 'var(--color-ivory)',
                    strokeOpacity: 0.08,
                    strokeWidth: 0.8,
                    duration: fadeEnd - fadeStart,
                    ease: 'power2.in'
                  },
                  fadeStart
                );
              }
            }
          }

          // 2. Exit: ring scales up to 12 and fades out
          if (i < 6) {
            const exitStart = (i + 2 + 0.6) * segment;
            const exitEnd = (i + 2 + 1.2) * segment;
            tl.to(
              ring,
              {
                scale: 12,
                opacity: 0,
                duration: exitEnd - exitStart,
                ease: 'power2.inOut',
                transformOrigin: '50% 50%'
              },
              exitStart
            );
          }
        }

        // --- CHAPTER CONTENT ANIMATIONS ---
        const portal = chapterContentRefs.current[i];
        const text = chapterTextRefs.current[i];
        const imgWrap = chapterImageRefs.current[i];
        
        if (portal) {
          // 1. Portal Entrance (skip Chapter 1 as it starts visible after intro exits)
          if (i > 0) {
            const entStart = (i + 2 - 0.2) * segment;
            const entEnd = (i + 2 + 0.2) * segment;
            
            tl.set(portal, { opacity: 1 }, entStart);

            if (imgWrap) {
              tl.fromTo(
                imgWrap,
                { opacity: 0 },
                { opacity: 1, duration: entEnd - entStart, ease: 'power2.out' },
                entStart
              );
              const img = imgWrap.querySelector('img');
              if (img) {
                tl.to(
                  img,
                  {
                    scale: 1.0,
                    duration: entEnd - entStart,
                    ease: 'power2.out'
                  },
                  entStart
                );
              }
            }

            if (text) {
              tl.to(
                text,
                {
                  opacity: 1,
                  y: 0,
                  duration: entEnd - entStart,
                  ease: 'power2.out'
                },
                entStart
              );
            }
          }

          // 2. Portal Exit (except for Chapter 7, which has a custom exit)
          if (i < 6) {
            const extStart = (i + 2 + 0.6) * segment;
            const extEnd = (i + 2 + 0.9) * segment;

            if (imgWrap) {
              tl.to(
                imgWrap,
                {
                  opacity: 0,
                  duration: extEnd - extStart,
                  ease: 'power2.out'
                },
                extStart
              );
            }

            if (text) {
              tl.to(
                text,
                {
                  opacity: 0,
                  y: -35,
                  duration: extEnd - extStart,
                  ease: 'power2.in'
                },
                extStart
              );
            }

            // Hide portal container
            tl.set(portal, { opacity: 0 }, (i + 2 + 1.2) * segment);
          }
        }
      }

      // 1. Chapter 07 Exit (0.85 to 0.90)
      const ch7Portal = chapterContentRefs.current[6];
      const ch7Text = chapterTextRefs.current[6];
      const ch7Img = chapterImageRefs.current[6];

      if (ch7Portal) {
        if (ch7Img) {
          tl.to(
            ch7Img,
            {
              opacity: 0,
              scale: 0.92,
              duration: 0.05,
              ease: 'power3.inOut'
            },
            0.85
          );
        }
        if (ch7Text) {
          tl.to(
            ch7Text,
            {
              opacity: 0,
              y: -30,
              duration: 0.05,
              ease: 'power3.inOut'
            },
            0.85
          );
        }
        // Hide portal container
        tl.set(ch7Portal, { opacity: 0 }, 0.90);
      }

      // 2. Final Gold Center Point Bridge: fades back in during Ch 7 exit (0.85 to 0.90)
      if (centerCircleRef.current) {
        tl.to(
          centerCircleRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.05,
            ease: 'power3.inOut'
          },
          0.85
        );
      }

      // 3. Final Tunnel and Gold Center Expansion (0.90 to 0.94)
      if (tunnelGroupRef.current) {
        tl.to(
          tunnelGroupRef.current,
          {
            scale: 3.5,
            opacity: 0,
            duration: 0.04,
            ease: 'power3.in',
            transformOrigin: '50% 50%'
          },
          0.90
        );
      }
      if (centerCircleRef.current) {
        tl.to(
          centerCircleRef.current,
          {
            scale: 60,
            opacity: 0,
            duration: 0.04,
            ease: 'power3.in',
            transformOrigin: '50% 50%'
          },
          0.90
        );
      }

      // 4. Moment of Silence (0.94 to 0.95)

      // 5. Final Message Enters (0.95 to 0.98)
      if (finalPortalRef.current) {
        tl.to(finalPortalRef.current, { opacity: 1, duration: 0.01 }, 0.95);
      }
      if (finalHeadingRef.current) {
        tl.to(
          finalHeadingRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.03,
            ease: 'power3.out'
          },
          0.95
        );
      }

      // Staggered Period Dot Animation (0.975 to 0.985)
      if (finalDotRef.current) {
        tl.to(
          finalDotRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.01,
            ease: 'power2.out'
          },
          0.975
        );
      }

      // 6. Quote Enters (0.98 to 1.0)
      if (finalQuoteRef.current) {
        tl.to(
          finalQuoteRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.02,
            ease: 'power2.out'
          },
          0.98
        );
      }
    }, rootRef);

    return () => ctx.revert();
  }, [reduceMotion, imageMetrics]);

  if (reduceMotion) {
    return (
      <section className="bg-charcoal text-ivory px-[7vw] py-[12vh]">
        <div className="mb-[8vh]">
          <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-gold mb-4">
            The Layers of a Life
          </p>
          <h1 className="font-display text-[clamp(40px,6vw,72px)] leading-[0.95]">
            DR. WAIEL AWWAD
          </h1>
        </div>
        <div className="space-y-[10vh]">
          {CHAPTERS.map((c) => (
            <div key={c.number} className="max-w-[60ch] border-l border-gold/30 pl-6">
              <p className="font-mono text-[10px] tracking-[0.24em] text-gold mb-3">
                {c.number} — {c.label}
              </p>
              <h2 className="font-display text-[clamp(28px,4vw,48px)] leading-[1] mb-5">
                {c.title.join(' ')}
              </h2>
              <p className="text-ivory/70 text-[15px] leading-[1.8] mb-4">{c.body}</p>
              {c.keywords && c.keywords.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {c.keywords.map((k) => (
                    <span key={k} className="font-mono text-[9px] tracking-[0.2em] text-gold/75 border border-gold/25 rounded-full px-2.5 py-0.5">
                      {k}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="max-w-[60ch] border-l border-gold pl-6 pt-6">
            <h2 className="font-display text-[clamp(32px,5vw,56px)] leading-[1] text-ivory uppercase mb-4">
              THE STORY CONTINUES
            </h2>
            <p className="text-ivory/60 font-mono text-xs">
              From witnessing events to understanding the forces behind them.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div ref={rootRef}>
      <section
        ref={pinRef}
        className="relative w-full h-screen overflow-hidden bg-charcoal bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.06)_0%,rgba(18,20,19,1)_70%)] text-ivory select-none"
      >
        <div className="absolute inset-0 z-[1] pointer-events-none opacity-[0.06] mix-blend-overlay bg-grain" />

        {/* Floating progress headers */}
        <div className="absolute top-[6%] left-1/2 -translate-x-1/2 z-[30] text-center pointer-events-none">
          <p ref={progressLabelRef} className="font-mono text-[10px] tracking-[0.22em] uppercase text-ivory/65">
            01 / 07 — ORIGIN
          </p>
        </div>

        {/* 3D CONCENTRIC TUNNEL CANVAS */}
        <svg
          className="absolute inset-0 z-[5] w-full h-full pointer-events-none"
          viewBox="-500 -500 1000 1000"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {RING_BASE_RADII.map((r, i) => (
              <path key={i} id={`about-ring-path-${i}`} d={circlePathD(r)} />
            ))}
            <radialGradient id="gold-core-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FAF8F5" stopOpacity="1" />
              <stop offset="30%" stopColor="#FFE8C5" stopOpacity="0.95" />
              <stop offset="70%" stopColor="#C5A880" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#8C7351" stopOpacity="0" />
            </radialGradient>
          </defs>

          <g ref={tunnelGroupRef} style={{ transformOrigin: '50% 50%' }}>
            {RING_BASE_RADII.map((r, i) => (
              <g
                key={i}
                ref={(el) => (ringGroupRefs.current[i] = el)}
                style={{ transformOrigin: '50% 50%' }}
              >
                {/* Concentric Thin Rings */}
                <circle
                  r={r}
                  fill="none"
                  stroke="var(--color-ivory)"
                  strokeOpacity={0.08}
                  strokeWidth="0.8"
                  vectorEffect="non-scaling-stroke"
                />
                
                {/* Spiral/Circular Monospaced Labels */}
                <text
                  fill="var(--color-ivory)"
                  fillOpacity={0.08}
                  fontFamily="var(--font-mono, monospace)"
                  fontSize="7.5"
                  letterSpacing="2.5"
                  vectorEffect="non-scaling-stroke"
                >
                  <textPath
                    ref={(el) => (ringTextRefs.current[i] = el)}
                    href={`#about-ring-path-${i}`}
                    startOffset={`${(i * 15) % 100}%`}
                  >
                    · LOADING ·
                  </textPath>
                </text>
              </g>
            ))}

            {/* Core point we dive into */}
            <circle
              ref={centerCircleRef}
              r="22"
              fill="url(#gold-core-glow)"
              style={{ transformOrigin: '50% 50%' }}
            />
          </g>
        </svg>

        {/* EDITORIAL CHAPTER PORTALS */}
        <div className="absolute inset-0 z-[20] pointer-events-none">
          {/* Intro Title Portal (State 0 and 1) */}
          <div
            ref={introPortalRef}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-[8vw] pointer-events-none"
            style={{ opacity: 1 }}
          >
            <h1 className="font-display font-normal text-[clamp(32px,5.5vw,90px)] leading-[1.0] uppercase tracking-[-0.02em] text-ivory flex flex-wrap items-center justify-center gap-x-4 md:gap-x-6">
              <span>The LAYERS</span>
              <span
                ref={introBracketRef}
                className="inline-flex items-center text-gold origin-center font-display"
                style={{ width: 0, opacity: 0, scale: 0.75, overflow: 'hidden' }}
              >
                <span className="text-[clamp(36px,6vw,100px)] font-light leading-none mr-2 md:mr-3">(</span>
                <span className="text-[clamp(14px,2.2vw,26px)] font-mono tracking-[0.2em] font-bold uppercase whitespace-nowrap pt-1">
                  DR. WAIEL AWWAD
                </span>
                <span className="text-[clamp(36px,6vw,100px)] font-light leading-none ml-2 md:mr-3">)</span>
              </span>
              <span>OF LIFE</span>
            </h1>
          </div>

          {CHAPTERS.map((chapter, i) => (
            <div
              key={chapter.number}
              ref={(el) => (chapterContentRefs.current[i] = el)}
              className="absolute inset-0 flex flex-col lg:flex-row items-center justify-center gap-[8vw] px-[8vw] pointer-events-none"
              style={{ opacity: 0 }}
            >
              {/* Photo Windows with organic feel */}
              {chapter.image ? (
                <div
                  ref={(el) => (chapterImageRefs.current[i] = el)}
                  className="relative w-[72vw] max-w-[320px] lg:w-[32vw] lg:max-w-[460px] aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-charcoal/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                >
                  <img
                    src={chapter.image}
                    alt={chapter.label}
                    className="h-full w-full object-cover grayscale-[30%] contrast-[1.05]"
                    style={{ objectPosition: chapter.objectPosition || 'center' }}
                  />
                </div>
              ) : (
                /* Archival placeholder for frontlines */
                <div
                  ref={(el) => (chapterImageRefs.current[i] = el)}
                  className="relative w-[72vw] max-w-[320px] lg:w-[32vw] lg:max-w-[460px] aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-ivory/10 flex items-center justify-center bg-charcoal/30 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                >
                  <div className="absolute w-44 h-44 rounded-full border border-gold/15 animate-spin" style={{ animationDuration: '30s' }} />
                  <div className="absolute w-32 h-32 rounded-full border border-ivory/10 animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }} />
                  <div className="absolute w-20 h-20 rounded-full border border-gold/30 animate-spin" style={{ animationDuration: '10s' }} />
                  <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-gold/50 z-10">
                    Documentary
                  </span>
                </div>
              )}

              {/* Text Area */}
              <div
                ref={(el) => (chapterTextRefs.current[i] = el)}
                className="max-w-[55ch] text-center lg:text-left"
                style={{ opacity: 0 }}
              >
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-gold block mb-3">
                  {chapter.number} — {chapter.label}
                </span>
                <h2 className="font-display font-normal text-[clamp(28px,4.5vw,58px)] leading-[0.95] mb-5 text-ivory uppercase">
                  {chapter.title.map((line, li) => (
                    <span key={li} className="block">{line}</span>
                  ))}
                </h2>
                <p className="text-ivory/80 text-[14px] lg:text-[15.5px] leading-[1.8] mb-6">
                  {chapter.body}
                </p>
                {chapter.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start">
                    {chapter.keywords.map((k) => (
                      <span
                        key={k}
                        className="font-mono text-[8.5px] tracking-[0.2em] uppercase text-gold border border-gold/25 rounded-full px-3 py-1"
                      >
                        {k}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Final Center Message */}
          <div
            ref={finalPortalRef}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-[8vw] pointer-events-none"
            style={{ opacity: 0 }}
          >
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold mb-6 block">
              The Journey
            </span>
            <h2
              ref={finalHeadingRef}
              className="font-display font-normal text-[clamp(44px,7.5vw,115px)] leading-[0.9] tracking-[-0.04em] uppercase text-ivory mb-6"
            >
              THE STORY
              <br />
              CONTINUES<span ref={finalDotRef} className="text-gold">.</span>
            </h2>
            <p
              ref={finalQuoteRef}
              className="max-w-[48ch] text-ivory/70 text-[15px] lg:text-[16.5px] leading-[1.8] italic"
            >
              "From witnessing events to understanding the forces behind them."
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}