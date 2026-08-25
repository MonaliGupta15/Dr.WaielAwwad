import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroImage from '../assets/hero.png';
import footerBg from '../assets/footer-bg.png';

gsap.registerPlugin(ScrollTrigger);

const headlines = [
  'JOURNALISM',
  'WEST ASIA',
  'GLOBAL AFFAIRS',
  'DIPLOMACY',
  'PUBLIC LIFE',
  'LEADERSHIP',
  'SERVICE',
];

// footer-bg.png — your exported charcoal-to-grey background asset.
// Save it at src/assets/footer-bg.png in your project.

export default function Footer() {
  const footerRef = useRef(null);
  const titleRef = useRef(null);
  const lineTheRef = useRef(null);
  const lineStoryRef = useRef(null);
  const lineContinuesRef = useRef(null);
  const portraitRef = useRef(null);
  const theFirstLetterRef = useRef(null);
  const theSecondLetterRef = useRef(null);
  const storyFirstLetterRef = useRef(null);
  const storySecondLetterRef = useRef(null);
  const continuesFirstLetterRef = useRef(null);
  const metaRef = useRef(null);
  const rulesRef = useRef([]);
  const tickerRef = useRef(null);

  useLayoutEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mql.matches) return;

    let active = true;
    let ctx;

    const initGSAP = () => {
      // Revert previous GSAP context to reset inline transform styles before measurement
      if (ctx) ctx.revert();
      if (!active || !footerRef.current) return;

      ctx = gsap.context(() => {
        const zoom = parseFloat(document.documentElement.style.zoom) || 1;
        const layoutWidth = window.innerWidth / zoom;

        // Entrance reveals
        rulesRef.current.forEach((rule, index) => {
          gsap.fromTo(
            rule,
            { scaleY: 0 },
            {
              scaleY: 1,
              duration: 1.1,
              delay: index * 0.08,
              ease: 'power3.out',
              transformOrigin: 'top center',
              scrollTrigger: { trigger: footerRef.current, start: 'top 65%', once: true },
            }
          );
        });

        gsap.fromTo(
          metaRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: { trigger: footerRef.current, start: 'top 55%', once: true },
          }
        );

        // Staircase alignment, done by direct position measurement
        const theFinalX = layoutWidth * 0.015; // THE's own resting offset

        // STORY: shift so "S" lands under THE's "H"
        const theH_naturalLeft = theSecondLetterRef.current.getBoundingClientRect().left / zoom;
        const storyS_naturalLeft = storyFirstLetterRef.current.getBoundingClientRect().left / zoom;
        const storyFinalX = (theH_naturalLeft + theFinalX) - storyS_naturalLeft;

        // CONTINUES: shift so "C" lands under STORY's "T"
        const storyT_naturalLeft = storySecondLetterRef.current.getBoundingClientRect().left / zoom;
        const continuesC_naturalLeft = continuesFirstLetterRef.current.getBoundingClientRect().left / zoom;
        const continuesFinalX = (storyT_naturalLeft + storyFinalX) - continuesC_naturalLeft;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: 1.5,
          },
        });

        const portraitStartX = -layoutWidth;

        // Portrait: starts at THE's exact position, fully transparent,
        // then glides out to its resting spot on the right at 0.72 opacity.
        tl.fromTo(
          portraitRef.current,
          { x: portraitStartX, opacity: 0 },
          { x: 0, opacity: 0.72, ease: 'sine.inOut', duration: 1.0 },
          0
        );

        const textStartX = -Math.min(layoutWidth * 0.4, 280);

        // THE line: emerges from the left and follows the portrait
        tl.fromTo(
          lineTheRef.current,
          { x: textStartX, opacity: 0 },
          { x: theFinalX, opacity: 1, ease: 'sine.inOut', duration: 0.9 },
          0.1
        );

        // STORY line: "S" lands directly under THE's "H"
        tl.fromTo(
          lineStoryRef.current,
          { x: textStartX, opacity: 0 },
          { x: storyFinalX, opacity: 1, ease: 'sine.inOut', duration: 0.82 },
          0.18
        );

        // CONTINUES line: "C" lands directly under STORY's "T"
        tl.fromTo(
          lineContinuesRef.current,
          { x: textStartX, opacity: 0 },
          { x: continuesFinalX, opacity: 1, ease: 'sine.inOut', duration: 0.75 },
          0.25
        );

        // Slow editorial ticker
        gsap.to(tickerRef.current, {
          xPercent: -50,
          duration: 28,
          ease: 'none',
          repeat: -1,
        });

        // Force ScrollTrigger to refresh markers with new coordinates
        ScrollTrigger.refresh();
      }, footerRef);
    };

    document.fonts.ready.then(() => {
      initGSAP();
    });

    const handleResize = () => {
      initGSAP();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      active = false;
      window.removeEventListener('resize', handleResize);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative min-h-screen overflow-hidden text-ivory"
      style={{
        backgroundImage: `url(${footerBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Grain */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.06] mix-blend-overlay bg-grain" />

      {/* Portrait — now expects a background-removed (transparent PNG)
          cutout of the subject. No gradient masking needed on the image
          itself anymore since the footer's own background color carries
          the transition — the cutout just sits on top of it cleanly at
          any scroll position. */}
      <div
        ref={portraitRef}
        className="absolute z-[2]
          top-[22vh] right-[-15vw]
          h-[30vh] w-auto md:inset-y-0 md:top-0 md:right-[-3.5vw] md:portrait:right-[-12vw] md:w-[63vw] md:h-auto
          max-w-none
          pointer-events-none
          will-change-transform"
      >
        <img
          src={heroImage}
          alt=""
          className="h-full w-auto md:w-full object-contain object-right md:object-right-bottom md:portrait:object-right grayscale"
        />
      </div>

      {/* Editorial ticker */}
      <div className="absolute top-[6vh] md:top-[9%] left-0 w-full overflow-hidden z-10">
        <div ref={tickerRef} className="flex w-max whitespace-nowrap">
          {[...headlines, ...headlines].map((item, index) => (
            <div key={`${item}-${index}`} className="flex items-center">
              <span className="mx-7 font-mono text-[10px] md:text-xs tracking-[0.28em] text-ivory/45">
                {item}
              </span>
              <span className="text-gold text-xs">◆</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main editorial composition */}
      <div className="relative min-h-screen px-[6vw] pt-[12vh] md:pt-[18vh] pb-12 flex flex-col justify-between">
        <div className="font-mono text-[9px] md:text-[11px] tracking-[0.28em] uppercase text-ivory/50">
          <span className="text-gold">ARCHIVE / 2026</span>
          <span className="mx-3">—</span>
          The story continues
        </div>

        <div className="relative mt-[10vh] mb-[12vh]">
          <div ref={titleRef} className="relative z-10 md:-translate-x-[2vw] md:portrait:-translate-x-[3vw]">
            <div className="font-display uppercase font-normal leading-[0.76] tracking-[-0.055em]">
              <div ref={lineTheRef} className="text-[clamp(32px,8vw,140px)] will-change-transform whitespace-nowrap">
                <span ref={theFirstLetterRef} className="inline-block char-the">T</span>
                <span ref={theSecondLetterRef} className="inline-block char-the">H</span>
                <span className="inline-block char-the">E</span>
              </div>

              <div ref={lineStoryRef} className="relative text-[clamp(32px,8vw,140px)] will-change-transform whitespace-nowrap">
                <span ref={storyFirstLetterRef} className="inline-block char-story">S</span>
                <span ref={storySecondLetterRef} className="inline-block char-story">T</span>
                <span className="inline-block char-story">O</span>
                <span className="inline-block char-story">R</span>
                <span className="inline-block char-story">Y</span>
                <span className="text-gold italic inline-block char-story">.</span>
              </div>

              <div ref={lineContinuesRef} className="text-[clamp(32px,8vw,140px)] will-change-transform whitespace-nowrap">
                <span ref={continuesFirstLetterRef} className="inline-block char-continues">C</span>
                <span className="inline-block char-continues">O</span>
                <span className="inline-block char-continues">N</span>
                <span className="inline-block char-continues">T</span>
                <span className="inline-block char-continues">I</span>
                <span className="inline-block char-continues">N</span>
                <span className="inline-block char-continues">U</span>
                <span className="inline-block char-continues">E</span>
                <span className="inline-block char-continues">S</span>
                <span className="text-gold inline-block char-continues">.</span>
              </div>
            </div>
          </div>

          <div className="mt-24 max-w-[280px] md:mt-0 md:max-w-[170px] md:absolute md:right-[1.5vw] md:bottom-[-80px] md:portrait:bottom-[-220px] z-20">
            <div className="w-8 h-px bg-gold mb-4" />
            <p className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] leading-[1.8] text-ivory/55">
              A life documented through journalism,
              public service and a lifelong engagement
              with the region.
            </p>
          </div>
        </div>

        <div className="relative z-20 grid grid-cols-2 gap-x-[8vw] gap-y-2 md:grid-cols-4 md:gap-x-0 md:gap-y-0 border-t border-ivory/15">
          {[
            {
              label: 'Explore',
              links: [
                { label: 'Master Profile', href: '/master-profile' },
                { label: 'Gallery', href: '/gallery' },
                { label: 'Articles', href: '/articles' },
              ]
            },
            {
              label: 'Connect',
              links: [
                { label: 'Contact', href: '/contact' },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dr-waiel-awwad-1a793b7/', target: '_blank', rel: 'noopener noreferrer' },
              ]
            },
            {
              label: 'Perspective',
              links: [
                { label: 'Journalism', href: '#' },
                { label: 'West Asia', href: '#' },
                { label: 'Global Affairs', href: '#' },
              ]
            },
            {
              label: 'Archive',
              links: [
                { label: '2026', href: '#' },
                { label: 'India', href: '#' },
              ]
            },
          ].map((column, index) => (
            <div
              key={column.label}
              ref={(el) => {
                if (el) rulesRef.current[index] = el;
              }}
              className={`relative py-5 md:py-9 md:px-6 first:md:pl-0 ${index < 2 ? 'border-b' : 'border-b-0'} md:border-b-0 border-ivory/10`}
            >
              <div className="font-mono text-[9px] tracking-[0.25em] uppercase text-gold mb-3 md:mb-5">
                {column.label}
              </div>
              <div className="space-y-2">
                {column.links.map((link) => {
                  const isExternal = link.href.startsWith('http') || link.href === '#';
                  if (isExternal) {
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target={link.target || undefined}
                        rel={link.rel || undefined}
                        className="block font-display text-xs md:text-sm text-ivory/65 hover:text-ivory transition-colors duration-300"
                      >
                        {link.label}
                      </a>
                    );
                  }
                  return (
                    <Link
                      key={link.label}
                      to={link.href}
                      className="block font-display text-xs md:text-sm text-ivory/65 hover:text-ivory transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
              {index < 3 && (
                <div className="hidden md:block absolute right-0 top-6 bottom-6 w-px bg-ivory/10" />
              )}
            </div>
          ))}
        </div>

        <div
          ref={metaRef}
          className="mt-8 pt-5 border-t border-ivory/15 flex flex-col md:flex-row justify-between gap-4 font-mono text-[9px] tracking-[0.2em] uppercase text-ivory/40 relative z-20"
        >
          <span>
            © 2026 Dr. Waiel Awwad. All Rights Reserved. Designed and Developed by{' '}
            <a
              href="https://indicorpit.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors normal-case underline"
            >
              IndiCorp IT Solutions Pvt. Ltd.
            </a>
          </span>
          <span>Journalism · Leadership · Service</span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-ivory/60 hover:text-gold transition-colors"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
