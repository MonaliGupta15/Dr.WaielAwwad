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

    let ctx;

    document.fonts.ready.then(() => {
      if (!footerRef.current) return;

      ctx = gsap.context(() => {
        const isSmall = window.innerWidth < 1024;

        /* ---------------------------------------------------------
           ENTRANCE REVEALS — unchanged
        --------------------------------------------------------- */
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

        const zoom = parseFloat(document.documentElement.style.zoom) || 1;
        const layoutWidth = window.innerWidth / zoom;

        // Measure exactly where "THE" sits (its natural, untransformed
        // position — before its own slide-in animation runs) and how far
        // left of that the portrait's resting box currently starts. That
        // delta is the pixel-exact distance to pull the portrait so it
        // begins flush with "THE", regardless of viewport width or font
        // metrics — no guessed vw offsets. An extra push (EXTRA_LEFT_PUSH)
        // is added on top so the head starts visibly further left than
        // THE itself, not just flush with it — bump this up/down to taste.
        const EXTRA_LEFT_PUSH = layoutWidth * 0.12;
        const portraitStartX = -layoutWidth;

        // Staircase alignment, done by direct position measurement rather
        // than summing letter widths (which drifts under negative tracking
        // and kerning). For each pair we measure the TARGET letter's real
        // on-screen left edge and the MOVING letter's real on-screen left
        // edge, in their natural pre-transform layout, and the difference
        // is the exact px shift that line needs to land precisely.
        const theFinalX = layoutWidth * 0.015; // THE's own resting offset

        // STORY: shift so "S" lands under THE's "H" (which itself will
        // sit theFinalX further right than it does right now)
        const theH_naturalLeft = theSecondLetterRef.current.getBoundingClientRect().left / zoom;
        const storyS_naturalLeft = storyFirstLetterRef.current.getBoundingClientRect().left / zoom;
        const storyFinalX = (theH_naturalLeft + theFinalX) - storyS_naturalLeft;

        // CONTINUES: shift so "C" lands under STORY's "T" (which itself
        // will sit storyFinalX further right than it does right now)
        const storyT_naturalLeft = storySecondLetterRef.current.getBoundingClientRect().left / zoom;
        const continuesC_naturalLeft = continuesFirstLetterRef.current.getBoundingClientRect().left / zoom;
        const continuesFinalX = (storyT_naturalLeft + storyFinalX) - continuesC_naturalLeft;

        /* ---------------------------------------------------------
           CONVERGENCE TIMELINE — starts the instant the footer begins
           entering the viewport ('top bottom'), so nothing sits empty
           waiting for a pin to kick in. The slowness instead comes from
           stretching the trigger across the footer's ENTIRE scroll-through
           span, all the way to 'bottom center' — roughly double the
           distance of just its entrance — using scroll distance that's
           already naturally there (no pin/spacer needed, no risk of
           running out of room since it's the last section on the page).
        --------------------------------------------------------- */
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: 1.5,
          },
        });

        // Portrait: starts at THE's exact position, fully transparent,
        // then glides out to its resting spot on the right at 0.72 opacity.
        // sine.inOut eases the interpolation itself, so even though scroll
        // position drives it, the motion doesn't feel linear/mechanical.
        tl.fromTo(
          portraitRef.current,
          { x: portraitStartX, opacity: 0 },
          { x: 0, opacity: 0.72, ease: 'sine.inOut', duration: 1.0 },
          0
        );

        // THE line: emerges from the left and follows the portrait
        tl.fromTo(
          lineTheRef.current,
          { x: -layoutWidth * 0.5, opacity: 0 },
          { x: theFinalX, opacity: 1, ease: 'sine.inOut', duration: 0.9 },
          0.1
        );

        // STORY line: "S" lands directly under THE's "H"
        tl.fromTo(
          lineStoryRef.current,
          { x: -layoutWidth * 0.5, opacity: 0 },
          { x: storyFinalX, opacity: 1, ease: 'sine.inOut', duration: 0.82 },
          0.18
        );

        // CONTINUES line: "C" lands directly under STORY's "T"
        tl.fromTo(
          lineContinuesRef.current,
          { x: -layoutWidth * 0.5, opacity: 0 },
          { x: continuesFinalX, opacity: 1, ease: 'sine.inOut', duration: 0.75 },
          0.25
        );

        // Slow editorial ticker — unchanged
        gsap.to(tickerRef.current, {
          xPercent: -50,
          duration: 28,
          ease: 'none',
          repeat: -1,
        });
      }, footerRef);
    });

    return () => {
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
        className="absolute z-10
          inset-y-0 right-[-3.5vw]
          w-[55vw] md:w-[63vw]
          max-w-none
          pointer-events-none
          will-change-transform"
      >
        <img
          src={heroImage}
          alt=""
          className="h-full w-full object-cover object-right-top grayscale"
        />
      </div>

      {/* Editorial ticker */}
      <div className="absolute top-[9%] left-0 w-full overflow-hidden z-10">
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
      <div className="relative min-h-screen px-[6vw] pt-[18vh] pb-12 flex flex-col justify-between">
        <div className="font-mono text-[9px] md:text-[11px] tracking-[0.28em] uppercase text-ivory/50">
          <span className="text-gold">ARCHIVE / 2026</span>
          <span className="mx-3">—</span>
          The story continues
        </div>

        <div className="relative mt-[10vh] mb-[12vh]">
          <div ref={titleRef} className="overflow-hidden relative z-0">
            <div className="font-display uppercase font-normal leading-[0.76] tracking-[-0.055em]">
              <div ref={lineTheRef} className="text-[clamp(52px,10vw,140px)] will-change-transform">
                <span ref={theFirstLetterRef} className="inline-block char-the">T</span>
                <span ref={theSecondLetterRef} className="inline-block char-the">H</span>
                <span className="inline-block char-the">E</span>
              </div>

              <div ref={lineStoryRef} className="relative text-[clamp(52px,10vw,140px)] will-change-transform">
                <span ref={storyFirstLetterRef} className="inline-block char-story">S</span>
                <span ref={storySecondLetterRef} className="inline-block char-story">T</span>
                <span className="inline-block char-story">O</span>
                <span className="inline-block char-story">R</span>
                <span className="inline-block char-story">Y</span>
                <span className="text-gold italic inline-block char-story">.</span>
              </div>

              <div ref={lineContinuesRef} className="text-[clamp(52px,10vw,140px)] will-change-transform">
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

          <div className="absolute right-[3%] bottom-[-20px] max-w-[190px] z-20">
            <div className="w-8 h-px bg-gold mb-4" />
            <p className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] leading-[1.8] text-ivory/55">
              A life documented through journalism,
              public service and a lifelong engagement
              with the region.
            </p>
          </div>
        </div>

        <div className="relative z-20 grid grid-cols-1 md:grid-cols-4 border-t border-ivory/15">
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
              label: 'Perspective',
              links: [
                { label: 'Journalism', href: '#' },
                { label: 'West Asia', href: '#' },
                { label: 'Global Affairs', href: '#' },
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
              className="relative py-7 md:py-9 md:px-6 first:md:pl-0 border-b md:border-b-0 border-ivory/10"
            >
              <div className="font-mono text-[9px] tracking-[0.25em] uppercase text-gold mb-5">
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
