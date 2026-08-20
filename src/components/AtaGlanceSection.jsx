import React, { useEffect, useState, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import drProfileImage from '../assets/DrWaielAwwad.jpeg';
import imgRaisi from '../assets/16.webp';
import imgWestAsia from '../assets/5.webp';
import imgIndiainfluence from '../assets/23.jpeg';
import imgSyrianWar from '../assets/8.jfif';

gsap.registerPlugin(ScrollTrigger);

const ARTICLES_DATA = [
  {
    id: 1,
    category: 'GEOPOLITICS',
    title: 'Trump is prolonging Iran war to appease his billionaire associates, fulfill Israel\'s agenda: Middle East expert Waiel Awwad',
    description: 'Analyzing US foreign policy, Middle East expert Dr. Waiel Awwad argues that military escalations against Iran are fueled by strategic business associations and regional agendas.',
    image: imgRaisi,
    url: 'https://www.aninews.in/news/world/asia/trump-is-prolonging-iran-war-to-appease-his-billionaire-associates-fulfill-israels-agenda-middle-east-expert-waiel-awwad20260330141725/',
  },
  {
    id: 2,
    category: 'JOURNALISM',
    title: 'Syrian-born Waiel Awwad elected President of Foreign Correspondents’ Club of South Asia',
    description: 'Renowned international journalist Dr. Waiel Awwad elected to lead the FCC of South Asia, representing foreign media voices and strategic correspondence from the region.',
    image: imgIndiainfluence,
    url: 'https://theprint.in/india/syrian-born-waiel-awwad-elected-president-of-foreign-correspondents-club-of-south-asia/2636987/',
  },
  {
    id: 3,
    category: 'CONFLICT ANALYSIS',
    title: 'Only way for USA to win now is to drop nuclear dirty bomb on Iran: Waiel Awwad\'s prediction',
    description: 'A critical analysis of the escalating conflict, warning of the extreme strategic deadlocks and predictions facing global military involvement in West Asia.',
    image: imgWestAsia,
    url: 'https://www.hindustantimes.com/videos/world-news/only-way-for-usa-to-win-now-is-to-drop-nuclear-dirty-bomb-on-iran-waiel-awwads-scary-prediction-101782995523066.html',
  },
  {
    id: 4,
    category: 'STRATEGIC DEBATE',
    title: 'Why not attack North Korea which has nukes? Waiel Awwad demolishes Trump\'s Iran war justification',
    description: 'Deconstructing foreign policy justifications, comparing international strategic postures, and challenging military rationales in the Middle East.',
    image: imgSyrianWar,
    url: 'https://www.hindustantimes.com/videos/world-news/why-not-attack-north-korea-which-has-nukes-waiel-awwad-demolishes-trump-s-iran-war-justification-101773145488983.html',
  },
];

const TRIPLE_ARTICLES_DATA = [
  ...ARTICLES_DATA,
  ...ARTICLES_DATA,
  ...ARTICLES_DATA,
];

const AtAGlanceSection = () => {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);
  const titleRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isGrabbing, setIsGrabbing] = useState(false);

  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftState = useRef(0);
  const scrollRAF = useRef(null);
  const cardWidthRef = useRef(0); // cached, avoids repeated offsetWidth reads
  const scrollTimeoutRef = useRef(null);

  // Cache card width once on mount and on resize, instead of reading
  // offsetWidth on every scroll/interval tick (each read can force a
  // synchronous layout recalculation if layout is dirty).
  useEffect(() => {
    const measure = () => {
      if (sliderRef.current?.firstChild) {
        cardWidthRef.current = sliderRef.current.firstChild.offsetWidth + 24;
        
        // Initial positioning at the start of Set 2 for infinite loop
        sliderRef.current.scrollLeft = ARTICLES_DATA.length * cardWidthRef.current;
      }
    };
    const timer = setTimeout(measure, 100);
    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', measure);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.glance-title-line',
        { yPercent: 105 },
        {
          yPercent: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        '.glance-reveal',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        '.glance-card-reveal',
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.glance-slider-track',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Autoplay shuffling effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPaused || isDown.current) return;
      if (!sliderRef.current || !cardWidthRef.current) return;

      sliderRef.current.scrollBy({ left: cardWidthRef.current, behavior: 'smooth' });
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleScroll = useCallback(() => {
    if (sliderRef.current && cardWidthRef.current) {
      const scrollLeftVal = sliderRef.current.scrollLeft;
      const singleSetWidth = ARTICLES_DATA.length * cardWidthRef.current;

      // Calculate and update current active slide index (0 to 3)
      // Normalized relative to the start of Set 2 (singleSetWidth)
      const currentNormalizedScroll = scrollLeftVal - singleSetWidth;
      const index = Math.round(currentNormalizedScroll / cardWidthRef.current) % ARTICLES_DATA.length;
      const finalIndex = (index + ARTICLES_DATA.length) % ARTICLES_DATA.length;
      setCurrentIndex(finalIndex);

      // Debounce the seamless loop reset check so it only triggers when scroll ends
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        if (!sliderRef.current || !cardWidthRef.current) return;
        const currentScroll = sliderRef.current.scrollLeft;
        
        if (currentScroll >= singleSetWidth * 2) {
          sliderRef.current.classList.remove('scroll-smooth');
          sliderRef.current.scrollLeft = currentScroll - singleSetWidth;
          sliderRef.current.classList.add('scroll-smooth');
        } else if (currentScroll < singleSetWidth) {
          sliderRef.current.classList.remove('scroll-smooth');
          sliderRef.current.scrollLeft = currentScroll + singleSetWidth;
          sliderRef.current.classList.add('scroll-smooth');
        }
      }, 150);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (scrollRAF.current) cancelAnimationFrame(scrollRAF.current);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const scrollLeft = () => {
    if (sliderRef.current && cardWidthRef.current) {
      sliderRef.current.scrollBy({ left: -cardWidthRef.current, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current && cardWidthRef.current) {
      sliderRef.current.scrollBy({ left: cardWidthRef.current, behavior: 'smooth' });
    }
  };

  const handleMouseDown = (e) => {
    if (!sliderRef.current) return;
    isDown.current = true;
    setIsGrabbing(true);
    setIsPaused(true);

    sliderRef.current.classList.remove('snap-x', 'snap-mandatory', 'scroll-smooth');

    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeftState.current = sliderRef.current.scrollLeft;
  };

  const handleMouseUp = () => {
    isDown.current = false;
    setIsGrabbing(false);
    setIsPaused(false);

    if (sliderRef.current && cardWidthRef.current) {
      sliderRef.current.classList.add('snap-x', 'snap-mandatory', 'scroll-smooth');
      const targetScroll = Math.round(sliderRef.current.scrollLeft / cardWidthRef.current) * cardWidthRef.current;
      sliderRef.current.scrollTo({ left: targetScroll, behavior: 'smooth' });
    }
  };

  const handleMouseLeave = () => {
    isDown.current = false;
    setIsGrabbing(false);
    setIsPaused(false);

    if (sliderRef.current && cardWidthRef.current) {
      sliderRef.current.classList.add('snap-x', 'snap-mandatory', 'scroll-smooth');
      const targetScroll = Math.round(sliderRef.current.scrollLeft / cardWidthRef.current) * cardWidthRef.current;
      sliderRef.current.scrollTo({ left: targetScroll, behavior: 'smooth' });
    }
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseMove = (e) => {
    if (!isDown.current || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    sliderRef.current.scrollLeft = scrollLeftState.current - walk;
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-ivory text-charcoal px-[7vw] py-[12vh]"
    >
      {/* ============ HEADER SECTION ============ */}
      <div className="max-w-[1400px] mx-auto mb-12 glance-reveal">
        <div className="flex gap-2 mb-4">
          <span className="px-4 py-1.5 bg-charcoal text-ivory rounded-full text-[10px] font-mono tracking-wider uppercase">
            Geopolitics
          </span>
          <span className="px-4 py-1.5 border border-charcoal/20 text-charcoal/70 rounded-full text-[10px] font-mono tracking-wider uppercase">
            Journalism
          </span>
        </div>

        <h2 ref={titleRef} className="font-display font-normal text-[clamp(28px,3.8vw,48px)] leading-[0.95] tracking-[-0.02em] uppercase">
          <span className="block overflow-hidden">
            <span className="glance-title-line block">
              Insights & <span className="text-gold italic">Analysis</span>
            </span>
          </span>
        </h2>
      </div>

      {/* ============ SPLIT GRID ============ */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[35%_65%] gap-12 lg:gap-16 items-start">

        {/* ============ LEFT COLUMN (STICKY) ============ */}
        <div className="w-full lg:sticky lg:top-[16vh] flex flex-col justify-between h-auto lg:h-[520px] glance-reveal">
          <div>
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-[24px] mb-6 border border-black/[0.05] shadow-sm">
              <img
                src={drProfileImage}
                alt="Dr. Waiel Awwad"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top"
              />
            </div>

            <p className="text-stone text-[14px] lg:text-[15px] leading-relaxed max-w-[34ch]">
              Featured articles, war reports, and strategic columns by veteran foreign correspondent Dr. Waiel Awwad, documenting shift of global dynamics.
            </p>
          </div>

          <div className="flex items-center gap-6 mt-8 lg:mt-0">
            <button
              onClick={scrollLeft}
              className="w-12 h-12 rounded-full border border-charcoal/20 flex lg:hidden items-center justify-center text-charcoal hover:bg-gold hover:border-gold hover:text-charcoal transition-all duration-500 cursor-pointer"
              aria-label="Previous Article"
            >
              ←
            </button>
            <span className="font-mono text-sm tracking-[0.2em] text-stone select-none">
              {Math.min(currentIndex + 1, ARTICLES_DATA.length)} / {ARTICLES_DATA.length}
            </span>
            <button
              onClick={scrollRight}
              className="w-12 h-12 rounded-full border border-charcoal/20 flex lg:hidden items-center justify-center text-charcoal hover:bg-gold hover:border-gold hover:text-charcoal transition-all duration-500 cursor-pointer"
              aria-label="Next Article"
            >
              →
            </button>
          </div>
        </div>

        {/* ============ RIGHT COLUMN (SLIDING TRACK) ============ */}
        <div className="relative w-full">
          {/* FLOATING NAVIGATION BUTTONS (DESKTOP) */}
          <button
            onClick={scrollLeft}
            className="absolute left-[-24px] top-[30%] -translate-y-1/2 z-20 hidden lg:flex w-12 h-12 rounded-full border border-charcoal/10 bg-ivory shadow-[0_6px_20px_rgba(0,0,0,0.08)] items-center justify-center text-charcoal hover:bg-gold hover:border-gold hover:text-charcoal transition-all duration-500 cursor-pointer"
            aria-label="Previous Article"
          >
            ←
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-[-24px] top-[30%] -translate-y-1/2 z-20 hidden lg:flex w-12 h-12 rounded-full border border-charcoal/10 bg-ivory shadow-[0_6px_20px_rgba(0,0,0,0.08)] items-center justify-center text-charcoal hover:bg-gold hover:border-gold hover:text-charcoal transition-all duration-500 cursor-pointer"
            aria-label="Next Article"
          >
            →
          </button>

          <div
            ref={sliderRef}
            onScroll={handleScroll}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            className="glance-slider-track flex overflow-x-auto gap-6 snap-x snap-mandatory no-scrollbar pb-8 w-full scroll-smooth cursor-grab active:cursor-grabbing select-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {TRIPLE_ARTICLES_DATA.map((article, idx) => (
              <article
                key={`${article.id}-${idx}`}
                className="glance-card-reveal glance-article-card relative w-[85vw] md:w-[45vw] lg:w-[28vw] shrink-0 snap-start flex flex-col bg-cream rounded-[24px] overflow-hidden transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:scale-[1.03] group"
              >
                {/* Thin Sand Border Overlay (Placed on top of images/content to avoid clipping) */}
                <div className="pointer-events-none absolute inset-0 rounded-[24px] border border-[#c5bca9] z-10" />

                {/* Static base shadow + a separate hover-shadow layer
                    that only animates OPACITY (compositor-only, cheap)
                    instead of animating box-shadow's blur radius
                    directly (forces repaint every frame). */}
                <div className="pointer-events-none absolute inset-0 rounded-[24px] shadow-[0_4px_12px_rgba(0,0,0,0.03)]" />
                <div className="pointer-events-none absolute inset-0 rounded-[24px] opacity-0 shadow-[0_20px_35px_rgba(18,20,19,0.06)] transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100" />

                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-[24px] bg-stone-light/10">
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent opacity-60" />
                </div>

                <div className="relative p-6 flex-grow flex flex-col justify-between bg-cream rounded-b-[24px]">
                  <div>
                    <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-gold block mb-2 font-medium">
                      {article.category}
                    </span>
                    <h3 className="font-display text-xl lg:text-2xl text-charcoal leading-snug tracking-tight font-medium group-hover:text-gold transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] mb-3 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-stone text-[13px] lg:text-[14px] leading-relaxed mb-6 line-clamp-3">
                      {article.description}
                    </p>
                  </div>

                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-charcoal text-ivory rounded-full text-xs font-mono uppercase tracking-wider self-start hover:bg-gold hover:text-charcoal transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-sm"
                  >
                    Read More
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>

      </div>


    </section>
  );
};

export default AtAGlanceSection;