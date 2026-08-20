/**
 * Navbar.jsx
 * ---------------------------------------------------------------
 * Single, reusable floating-pill navigation for the Dr. Waiel Awwad
 * site. Works globally across all routes — no page-specific props.
 *
 * Uses the project's existing Tailwind v4 @theme tokens
 * (src/index.css): --color-ivory, --color-charcoal, --color-stone-gray,
 * --color-forest, --color-gold, --font-serif, --font-sans.
 *
 * Responsive behavior (desktop pill vs. mobile compact pill + menu)
 * lives entirely in this one component via Tailwind breakpoints and
 * conditional rendering, per the brief.
 * ---------------------------------------------------------------
 */

import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV_LEFT = [
  { label: 'Home', to: '/' },
  { label: 'Master Profile', to: '/master-profile' },
];

const NAV_RIGHT = [
  { label: 'Gallery', to: '/gallery' },
  { label: 'Articles', to: '/articles' },
  { label: 'Contact', to: '/contact' },
];

const ALL_LINKS = [...NAV_LEFT, ...NAV_RIGHT];

function NavItem({ to, label, onClick }) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      onClick={onClick}
      className="relative px-3.5 py-2 text-[13px] tracking-wide text-ivory/70 transition-colors duration-200 hover:text-ivory"
    >
      {({ isActive }) => (
        <motion.span
          className="relative inline-block"
          whileHover={{ y: -1 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
        >
          {label}
          {isActive && (
            <motion.span
              layoutId="nav-underline"
              className="absolute -bottom-1 left-0 right-0 h-px bg-gold"
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            />
          )}
        </motion.span>
      )}
    </NavLink>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    // How far you can scroll before the navbar starts reacting to
    // direction at all. While inside this zone (i.e. still on the
    // hero) the navbar stays fully visible, exactly like vantara.in.
    // Defaults to one viewport height — adjust this if your Hero
    // section's rendered height differs (e.g. read it from a ref
    // via document.getElementById('hero')?.offsetHeight).
    const getHeroThreshold = () => window.innerHeight;

    const handleScroll = () => {
      if (isMenuOpen) {
        setIsVisible(true);
        return;
      }

      const currentScrollY = window.scrollY;
      const heroThreshold = getHeroThreshold();

      if (currentScrollY < heroThreshold) {
        // Still within the hero — navbar always visible, no hide/show flicker.
        setIsVisible(true);
      } else {
        const diff = currentScrollY - lastScrollY;
        if (diff > 5) {
          setIsVisible(false); // scrolling down past hero -> hide
        } else if (diff < -5) {
          setIsVisible(true); // scrolling up -> reappear
        }
      }

      setLastScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 24);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMenuOpen]);

  // lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // close mobile menu on escape
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e) => e.key === 'Escape' && setIsMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogoClick = (e) => {
    if (window.location.pathname === '/') {
      e.preventDefault();
      if (window.lenis) {
        window.lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleMobileLogoClick = (e) => {
    closeMenu();
    if (window.location.pathname === '/') {
      e.preventDefault();
      if (window.lenis) {
        window.lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed left-1/2 z-50 w-full -translate-x-1/2 px-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-24 opacity-0 scale-95 pointer-events-none'}`}
      style={{ top: '40px' }}
    >
      <div className="mx-auto max-w-3xl">
        {/* ============ DESKTOP / TABLET PILL ============ */}
        <nav
          aria-label="Primary"
          className={
            'hidden lg:flex items-center justify-between rounded-full border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ' +
            (isScrolled
              ? 'bg-charcoal/65 backdrop-blur-lg border-ivory/20 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.45)] py-3 px-6'
              : 'bg-charcoal/45 backdrop-blur-md border-ivory/15 shadow-none py-4 px-8')
          }
        >
          <div className="flex items-center">
            {NAV_LEFT.map((item) => (
              <NavItem key={item.to} {...item} />
            ))}
          </div>

          <NavLink
            to="/"
            end
            onClick={handleLogoClick}
            className="mx-4 shrink-0 font-sans text-xs lg:text-sm font-bold tracking-[0.25em] text-white uppercase whitespace-nowrap hover:text-gold transition-colors duration-250"
          >
            Dr. Waiel Awwad
          </NavLink>

          <div className="flex items-center">
            {NAV_RIGHT.map((item) => (
              <NavItem key={item.to} {...item} />
            ))}
          </div>
        </nav>

        {/* ============ MOBILE PILL ============ */}
        <div className="lg:hidden">
          <div
            className={
              'flex items-center justify-between rounded-full border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ' +
              (isScrolled || isMenuOpen
                ? 'bg-charcoal/65 backdrop-blur-lg border-ivory/20 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.45)] py-3 pl-6 pr-3.5'
                : 'bg-charcoal/45 backdrop-blur-md border-ivory/15 shadow-none py-3.5 pl-6 pr-4')
            }
          >
            <NavLink
              to="/"
              end
              onClick={handleMobileLogoClick}
              className="font-sans text-[11px] font-bold tracking-[0.2em] text-white uppercase whitespace-nowrap"
            >
              Dr. Waiel Awwad
            </NavLink>

            <button
              type="button"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-ivory/85 transition-colors hover:bg-ivory/10 hover:text-ivory"
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          {/* Mobile dropdown panel */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scaleY: 0.92 }}
                animate={{ opacity: 1, y: 0, scaleY: 1 }}
                exit={{ opacity: 0, y: -8, scaleY: 0.92 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.32, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: 'top' }}
                className="mt-2 overflow-hidden rounded-3xl border border-ivory/10 bg-charcoal/95 backdrop-blur-md shadow-[0_8px_30px_-12px_rgba(0,0,0,0.5)]"
              >
                <motion.ul
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={{
                    open: {
                      transition: { staggerChildren: reduceMotion ? 0 : 0.05, delayChildren: 0.06 },
                    },
                    closed: {
                      transition: { staggerChildren: reduceMotion ? 0 : 0.03, staggerDirection: -1 },
                    },
                  }}
                  className="flex flex-col px-3 py-3"
                >
                  {ALL_LINKS.map((item) => (
                    <motion.li
                      key={item.to}
                      variants={{
                        open: { opacity: 1, y: 0 },
                        closed: { opacity: 0, y: -6 },
                      }}
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                    >
                      <NavLink
                        to={item.to}
                        end={item.to === '/'}
                        onClick={closeMenu}
                        className={({ isActive }) =>
                          'block rounded-xl px-4 py-3 text-[15px] tracking-wide transition-colors ' +
                          (isActive ? 'text-gold' : 'text-ivory/75 hover:text-ivory hover:bg-ivory/5')
                        }
                      >
                        {item.label}
                      </NavLink>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
