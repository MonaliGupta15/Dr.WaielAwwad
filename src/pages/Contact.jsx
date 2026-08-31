import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '../components/Footer';
import contactImage from '../assets/DrWaielAwwad.jpeg'; // TODO: swap for your preferred portrait/asset

gsap.registerPlugin(ScrollTrigger);

const LANGUAGES = ['English', 'Arabic', 'Hindi', 'French'];

const COUNTRY_CODES = [
  { code: '+91', iso: 'IN' },
  { code: '+963', iso: 'SY' },
  { code: '+1', iso: 'US' },
  { code: '+44', iso: 'GB' },
  { code: '+971', iso: 'AE' },
  { code: '+966', iso: 'SA' },
  { code: '+965', iso: 'KW' },
  { code: '+961', iso: 'LB' },
  { code: '+962', iso: 'JO' },
  { code: '+20', iso: 'EG' },
  { code: '+974', iso: 'QA' },
  { code: '+968', iso: 'OM' },
  { code: '+973', iso: 'BH' },
  { code: '+49', iso: 'DE' },
  { code: '+33', iso: 'FR' },
  { code: '+61', iso: 'AU' },
  { code: '+81', iso: 'JP' },
  { code: '+65', iso: 'SG' },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+91',
    phone: '',
    message: '',
    website: '',
    topic: '',
    date: '',
    language: '',
    additional: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const rootRef = useRef(null);
  const headingRef = useRef(null);
  const introRef = useRef(null);
  const formRef = useRef(null);
  const imageRef = useRef(null);
  const infoCardRef = useRef(null);

  useLayoutEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mql.matches) return;

    const ctx = gsap.context(() => {
      // Masked heading reveal — same technique as CareerPreview/Footer
      const headingLines = headingRef.current.querySelectorAll('.reveal-line-inner');
      gsap.fromTo(
        headingLines,
        { yPercent: 110 },
        { yPercent: 0, duration: 1, ease: 'power3.out', stagger: 0.1 }
      );

      gsap.fromTo(
        introRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', delay: 0.25 }
      );

      // Form fields stagger in
      const fields = formRef.current.querySelectorAll('.contact-field');
      gsap.fromTo(
        fields,
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power2.out',
          delay: 0.4,
        }
      );

      // Image — soft scale-in + parallax drift on scroll
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out', delay: 0.3 }
      );
      gsap.to(imageRef.current, {
        yPercent: -6,
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.4,
        },
      });

      // Info card
      gsap.fromTo(
        infoCardRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', delay: 0.5 }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setNewsletterEmail('');
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        countryCode: '+91',
        phone: '',
        message: '',
        website: '',
        topic: '',
        date: '',
        language: '',
        additional: '',
      });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const fieldWrap =
    'contact-field flex flex-col border-b border-charcoal/15 pb-2 focus-within:border-gold transition-colors duration-300';
  const labelClass = 'font-mono text-[9px] uppercase tracking-[0.2em] text-charcoal/80 mb-2';
  const inputClass =
    'bg-transparent border-none outline-none font-display text-lg text-charcoal placeholder-stone-gray/70 w-full';

  return (
    <div ref={rootRef} className="bg-ivory min-h-screen text-charcoal flex flex-col justify-between pt-[22vh] min-[990px]:pt-[24vh]">
      <div className="max-w-[1400px] mx-auto self-center px-[6vw] w-full mb-24">
        {/* Page Header */}
        <div className="mb-16 min-[990px]:mb-24">
          <span className="font-mono text-xs tracking-[0.28em] uppercase text-stone mb-4 block">
            Connect / Book Now
          </span>
          <h1
            ref={headingRef}
            className="font-display font-normal text-[clamp(42px,7vw,110px)] leading-[0.9] tracking-[-0.03em] uppercase overflow-hidden"
          >
            <span className="block overflow-hidden">
              <span className="reveal-line-inner block">Book Now</span>
            </span>
          </h1>
          <p ref={introRef} className="max-w-[56ch] text-stone text-[15px] min-[990px]:text-[16px] leading-[1.8] mt-6 opacity-0">
            Are you interested in featuring Dr. Awwad on your TV show, podcast, or as a
            guest speaker at your event? Do you need a hard-hitting article on a topic
            related to conflict zones? Use the form below to get in touch and tell us
            more about your project or request.
          </p>
        </div>

        <div className="grid grid-cols-1 min-[990px]:grid-cols-[1.1fr_0.9fr] gap-x-16 min-[990px]:gap-x-20 gap-y-10 items-stretch">
          {/* LEFT — Form */}
          <div className="min-[990px]:col-start-1 min-[990px]:row-start-1 min-[990px]:row-end-3 order-2 min-[990px]:order-1 space-y-16">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
              {/* Name — split first/last */}
              <div>
                <span className={labelClass + ' block mb-3'}>Name</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className={fieldWrap}>
                    <label className="font-mono text-[9px] uppercase tracking-[0.2em] text-stone mb-2">
                      First Name <span className="text-gold">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className={inputClass}
                      placeholder="First name"
                    />
                  </div>

                  <div className={fieldWrap}>
                    <label className="font-mono text-[9px] uppercase tracking-[0.2em] text-stone mb-2">
                      Last Name <span className="text-gold">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className={inputClass}
                      placeholder="Last name"
                    />
                  </div>
                </div>
              </div>

              {/* Email + Phone — side by side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className={fieldWrap}>
                  <label className={labelClass}>
                    Email <span className="text-gold">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    placeholder="your.email@domain.com"
                  />
                </div>

                <div className={fieldWrap}>
                  <label className={labelClass}>
                    Phone Number <span className="text-gold">*</span>
                  </label>
                  <div className="flex items-center w-full gap-2">
                    <div className="relative flex-shrink-0 flex items-center">
                      <select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleChange}
                        className="bg-transparent border-none outline-none font-display text-lg text-charcoal cursor-pointer appearance-none pr-5 py-0.5"
                      >
                        {COUNTRY_CODES.map((c) => (
                          <option key={`${c.code}-${c.iso}`} value={c.code} className="text-charcoal bg-ivory font-sans text-sm">
                            {c.iso} ({c.code})
                          </option>
                        ))}
                      </select>
                      <span className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[8px] text-charcoal/40">▼</span>
                    </div>

                    <div className="w-px h-5 bg-charcoal/15 mx-1 flex-shrink-0" />

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className={inputClass}
                      placeholder="00000 00000"
                    />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className={fieldWrap}>
                <label className={labelClass}>
                  Message <span className="text-gold">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className={inputClass + ' resize-none'}
                  placeholder="Describe your inquiry..."
                />
              </div>

              {/* Website Link */}
              <div className={fieldWrap}>
                <label className={labelClass}>Website Link</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="http://"
                />
              </div>

              {/* Proposed Topic or Theme */}
              <div className={fieldWrap}>
                <label className={labelClass}>
                  Proposed Topic or Theme <span className="text-gold">*</span>
                </label>
                <textarea
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  required
                  rows={3}
                  className={inputClass + ' resize-none'}
                  placeholder="What would you like to discuss or feature?"
                />
              </div>

              {/* Anticipated Date + Language — side by side on desktop */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className={fieldWrap}>
                  <label className={labelClass}>
                    Anticipated Date <span className="text-gold">*</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>

                <div className={fieldWrap}>
                  <label className={labelClass}>
                    Language Required <span className="text-gold">*</span>
                  </label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    required
                    className={inputClass + ' appearance-none cursor-pointer'}
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    {LANGUAGES.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Additional Information */}
              <div className={fieldWrap}>
                <label className={labelClass}>Additional Information</label>
                <textarea
                  name="additional"
                  value={formData.additional}
                  onChange={handleChange}
                  rows={3}
                  className={inputClass + ' resize-none'}
                  placeholder="Anything else we should know?"
                />
              </div>

              <button
                type="submit"
                className="contact-field bg-charcoal text-ivory font-mono text-[11px] uppercase tracking-[0.25em] px-8 py-4 rounded-full hover:bg-gold hover:text-charcoal transition-colors duration-300 shadow-md"
              >
                {submitted ? 'Message Sent' : 'Send'}
              </button>
            </form>
          </div>

          {/* RIGHT — Image */}
                    {/* RIGHT — Image + Contact Info, grouped so the info card's
              bottom edge lines up with the form's Send button.
              Mobile: wrapper is "contents" (invisible in the box tree)
              so image/form/info still stack in image -> form -> info
              order via each child's own order-* class.
              Desktop: wrapper becomes a real flex column spanning the
              SAME row range as the form (row-start-1 to row-end-3), so
              its total height matches the form exactly. justify-between
              then pins the image to the top and the info card to the
              bottom, flush with the Send button. */}
          <div className="contents min-[990px]:flex min-[990px]:flex-col min-[990px]:h-full min-[990px]:justify-between min-[990px]:col-start-2 min-[990px]:row-start-1 min-[990px]:row-end-3">
            <div
              ref={imageRef}
              className="order-1 min-[990px]:order-none relative w-full aspect-[2/3] min-[990px]:aspect-[3/4] overflow-hidden rounded-[24px] opacity-0 will-change-transform"
            >
              <img
                src={contactImage}
                alt="Dr. Waiel Awwad"
                className="h-full w-full object-cover object-top grayscale-[15%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
            </div>

            <div
              ref={infoCardRef}
              className="order-3 min-[990px]:order-none bg-charcoal/5 rounded-2xl border border-charcoal/5 p-8 min-[990px]:p-10 space-y-8 opacity-0"
            >
              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold block mb-2">
                  Direct Communications
                </span>
                <a
                  href="mailto:info@drwaielawwad.com"
                  className="font-display text-xl min-[990px]:text-2xl hover:text-gold transition-colors duration-300"
                >
                  info@drwaielawwad.com
                </a>
              </div>

              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold block mb-2">
                  Press Sovereignty Office
                </span>
                <p className="font-display text-lg min-[990px]:text-xl leading-relaxed text-charcoal/80">
                  New Delhi, India
                </p>
              </div>

              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold block mb-2">
                  Professional Networks
                </span>
                <a
                  href="https://www.linkedin.com/in/dr-waiel-awwad-1a793b7/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-lg min-[990px]:text-xl underline hover:text-gold transition-colors duration-300"
                >
                  LinkedIn Profile
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup Section */}
        <div className="mt-24 pt-16 border-t border-charcoal/10 flex flex-col items-center text-center">
          <p className="font-serif text-[15px] md:text-[18px] text-charcoal/80 max-w-[56ch] mb-6 leading-relaxed">
            Sign up with your email address to receive news and updates from Dr. Waiel Awwad.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full max-w-[500px] mb-8 justify-center items-center">
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Email Address"
              className="bg-white border border-charcoal/15 rounded-[4px] px-5 py-3.5 text-base text-charcoal placeholder-stone-gray/70 flex-grow outline-none focus:border-gold transition-colors font-sans w-full"
            />
            <button
              type="submit"
              className="bg-charcoal text-ivory font-mono text-[11px] uppercase tracking-[0.25em] px-9 py-4 rounded-full hover:bg-gold hover:text-charcoal transition-colors duration-300 shadow-sm flex-shrink-0 cursor-pointer w-full sm:w-auto"
            >
              {subscribed ? 'Subscribed' : 'Sign Up'}
            </button>
          </form>

          {/* Social Icons */}
          <div className="flex items-center gap-8 text-charcoal/70 mt-2">
            <a
              href="https://www.linkedin.com/in/dr-waiel-awwad-1a793b7/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors duration-300 text-lg md:text-xl font-serif font-bold italic leading-none"
              aria-label="LinkedIn"
            >
              in
            </a>
            <a
              href="https://x.com/waielawwad"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors duration-300 text-base md:text-[17px] font-sans font-extrabold leading-none"
              aria-label="X (Twitter)"
            >
              X
            </a>
            <a
              href="https://www.youtube.com/channel/UCr_dVn5TQtST7Oc_ixgDGsA/videos"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors duration-300"
              aria-label="YouTube"
            >
              <svg className="w-5.5 h-5.5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}