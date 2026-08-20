import React, { useEffect, useState } from 'react';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import Footer from '../components/Footer';
import img1 from '../assets/1.jpeg';
import img2 from '../assets/2.jpeg';
import img3 from '../assets/3.jpg';
import img4 from '../assets/4.jpeg';
import img5 from '../assets/5.webp';
import img6 from '../assets/6.jfif';
import img7 from '../assets/7.jpeg';
import img8 from '../assets/8.jfif';
import img9 from '../assets/9.jpeg';
import img10 from '../assets/10.jpeg';
import img11 from '../assets/11.jpeg';
import img12 from '../assets/12.jpeg';
import img13 from '../assets/13.webp';
import img14 from '../assets/14.webp';
import img15 from '../assets/15.webp';
import img16 from '../assets/16.webp';
import img20 from '../assets/20.jpeg';
import img21 from '../assets/21.jpeg';
import img23 from '../assets/23.jpeg';
import img24 from '../assets/24.jpeg';
import img25 from '../assets/25.jpeg';
import img26 from '../assets/26.jpeg';
import img27 from '../assets/27.jpeg';
import img28 from '../assets/28.jpeg';
import img29 from '../assets/29.jpeg';
import img30 from '../assets/30.jpeg';
import img31 from '../assets/31.jpeg';
import img32 from '../assets/32.png';

const galleryItems = [
  { image: img1, title: 'Dr. Waiel Awwad with Arab Ambassadors in New Delhi', position: 'object-top' },
  { image: img6, title: 'Meeting with Arab League Representatives in India', position: 'object-top' },
  { image: img14, title: 'Strengthening Bilateral Relations at the Inauguration Ceremony', position: 'object-top' },
  { image: img3, title: 'Receiving the Lifetime Achievement Award in Journalism', position: 'object-top' },
  { image: img5, title: 'Honored at the Global Counter-Terrorism Conference', position: 'object-top' },
  { image: img16, title: 'Panel Discussion on Regional Geopolitics on The Wire', position: 'object-top' },
  { image: img4, title: 'Addressing the India & Arab Countries Chamber of Commerce', position: 'object-top' },
  { image: img9, title: 'Inaugural Ceremony of India-Arab Bilateral Forum', position: 'object-[center_20%]' },
  { image: img10, title: 'Exchanging Mementos with Arab League Representatives', position: 'object-[center_20%]' },
  { image: img15, title: 'Presenting Mementos to Business Delegates', position: 'object-[center_20%]' },
  { image: img7, title: 'Exchanging Mementos with Ministry of External Affairs Officials', position: 'object-[center_20%]' },
  { image: img11, title: 'Felicitation Ceremony at FICCI Conclave', position: 'object-top' },
  { image: img13, title: 'Panel of Speakers at the India-Arab Business Forum', position: 'object-top' },
  { image: img12, title: 'Bilateral Discussion with Diplomatic Delegates', position: 'object-top' },
  { image: img2, title: 'Meeting with Arab Chambers and Indian Dignitaries', position: 'object-top' },
  { image: img8, title: 'Sh. Waiel Awwad with Indian Diplomatic Dignitaries', position: 'object-top' },
  { image: img20, title: 'Interacting with International Press Members at the Summit', position: 'object-top' },
  { image: img21, title: 'Panel Session on Indo-Arab Relations', position: 'object-top' },
  { image: img23, title: 'Group Photo with Diplomats at the Annual Conference', position: 'object-top' },
  { image: img24, title: 'Keynote Address at the International Media Forum', position: 'object-top' },
  { image: img25, title: 'Press Briefing on Geopolitical Affairs', position: 'object-top' },
  { image: img26, title: 'Receiving Honor from Business Leaders at FICCI', position: 'object-top' },
  { image: img27, title: 'Interacting with Media Professionals at Press Club', position: 'object-top' },
  { image: img28, title: 'Discussion on Global Security and Counter-Terrorism', position: 'object-top' },
  { image: img29, title: 'Speaking at the Indo-Arab Cultural Exchange', position: 'object-top' },
  { image: img30, title: 'Distinguished Guests at the Media Summit', position: 'object-top' },
  { image: img31, title: 'Press Conference on Middle East Strategic Relations', position: 'object-top' },
  { image: img32, title: 'Award Ceremony at the Foreign Correspondents\' Club', position: 'object-top' },
];

const videoItems = [
  { id: 'HFapbt-KGuI', title: 'Live Discussion on Strategic Partnerships in West Asia', url: 'https://www.youtube.com/live/HFapbt-KGuI' },
  { id: 'dLTGoZkXeDg', title: 'Special Broadcast: Geopolitical Shift in the Indo-Pacific', url: 'https://www.youtube.com/watch?v=dLTGoZkXeDg' },
  { id: 'yYbMyCf0T3M', title: 'Interview: India\'s Role in a Multipolar World Order', url: 'https://www.youtube.com/watch?v=yYbMyCf0T3M' },
  { id: 'lMbkMZUxPqI', title: 'Strategic Dialogue: Conflict Resolution and International Law', url: 'https://www.youtube.com/watch?v=lMbkMZUxPqI' },
  { id: 'msAWXLOR44Y', title: 'Global Press Conclave: Ethical Challenges in Conflict Reporting', url: 'https://www.youtube.com/watch?v=msAWXLOR44Y' },
  { id: 'kXhR9ePirZA', title: 'Middle East Briefing: Security Concerns and Rising Tensions', url: 'https://www.youtube.com/watch?v=kXhR9ePirZA' },
  { id: 'gPDe-QlnTBw', title: 'Live Conclave: Fostering Diplomacy and Cultural Bonds', url: 'https://www.youtube.com/live/gPDe-QlnTBw' },
  { id: 'ScX3zvZs9PM', title: 'Geopolitical Analysis: De-escalation Strategies in Regional Wars', url: 'https://www.youtube.com/watch?v=ScX3zvZs9PM' },
  { id: 'V_JIZD2MjLg', title: 'Bilateral Relations: Dynamics of Indo-Arab Commerce', url: 'https://www.youtube.com/watch?v=V_JIZD2MjLg' },
  { id: 'Jfxe2FnCZa8', title: 'International Media Forum: Foreign Correspondence in Warzones', url: 'https://www.youtube.com/watch?v=Jfxe2FnCZa8' },
  { id: 'oHEW6YxQjJE', title: 'Strategic Insight: Counter-Terrorism Operations and Global Security', url: 'https://www.youtube.com/watch?v=oHEW6YxQjJE' },
];

export default function Gallery() {
  const [activeTab, setActiveTab] = useState('photos');

  useEffect(() => {
    Fancybox.bind('[data-fancybox="gallery"]', {
      loop: true,
      Toolbar: {
        display: {
          left: ['infobar'],
          middle: [],
          right: ['zoom', 'slideshow', 'fullscreen', 'thumbs', 'close'],
        },
      },
      Thumbs: {
        autoStart: true,
      },
    });

    return () => {
      Fancybox.destroy();
    };
  }, [activeTab]); // Rebind Fancybox when activeTab changes

  return (
    <div className="bg-[#dce4e0] min-h-screen text-charcoal flex flex-col justify-between pt-[14vh]">
      <div className="max-w-[1400px] mx-auto px-[6vw] w-full mb-24">
        {/* Page Header */}
        <div className="mb-12 lg:mb-16">
          <span className="font-mono text-xs tracking-[0.28em] uppercase text-stone mb-4 block">
            Archive / Media
          </span>
          <h1 className="font-display font-normal text-[clamp(42px,7vw,110px)] leading-[0.9] tracking-[-0.03em] uppercase font-serif">
            Visual Gallery
          </h1>
          <p className="max-w-[52ch] text-stone text-[15px] lg:text-[16px] leading-[1.8] mt-6">
            A curated visual chronicle documenting four decades of investigative reporting, 
            diplomatic summits, live broadcasts, and field correspondence across the globe.
          </p>
        </div>

        {/* Tab Selectors */}
        <div className="flex justify-start gap-4 mb-12 border-b border-charcoal/10 pb-6">
          <button
            onClick={() => setActiveTab('photos')}
            className={`font-mono text-xs tracking-[0.2em] uppercase px-5 py-2.5 rounded-full transition-all duration-300 cursor-pointer ${
              activeTab === 'photos'
                ? 'bg-charcoal text-ivory shadow-sm font-semibold'
                : 'bg-white/40 text-stone hover:bg-white hover:text-charcoal border border-black/[0.05]'
            }`}
          >
            Photo Archive ({galleryItems.length})
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`font-mono text-xs tracking-[0.2em] uppercase px-5 py-2.5 rounded-full transition-all duration-300 cursor-pointer ${
              activeTab === 'videos'
                ? 'bg-charcoal text-ivory shadow-sm font-semibold'
                : 'bg-white/40 text-stone hover:bg-white hover:text-charcoal border border-black/[0.05]'
            }`}
          >
            Video Gallery ({videoItems.length})
          </button>
        </div>

        {/* Gallery Grid */}
        {activeTab === 'photos' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {galleryItems.map((item, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-[20px] p-5 border border-black/[0.05] shadow-[0_4px_15px_rgba(0,0,0,0.05)] transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:-translate-y-2.5 hover:shadow-[0_15px_35px_rgba(0,0,0,0.12)] flex flex-col"
              >
                <a 
                  href={item.image}
                  data-fancybox="gallery"
                  data-caption={item.title}
                  className="relative aspect-video w-full overflow-hidden rounded-[16px] bg-stone-light/10 mb-4 block cursor-zoom-in"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`w-full h-full object-cover ${item.position || 'object-center'} transition-transform duration-600 ease-in-out group-hover:scale-108`}
                  />
                </a>
                <h3 className="font-sans text-center text-[#0b2e59] text-[1.1rem] font-semibold mt-2 mb-1 line-clamp-2">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {videoItems.map((item, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-[20px] p-5 border border-black/[0.05] shadow-[0_4px_15px_rgba(0,0,0,0.05)] transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:-translate-y-2.5 hover:shadow-[0_15px_35px_rgba(0,0,0,0.12)] flex flex-col"
              >
                <a 
                  href={item.url}
                  data-fancybox="gallery"
                  data-caption={item.title}
                  className="relative aspect-video w-full overflow-hidden rounded-[16px] bg-stone-light/10 mb-4 block cursor-pointer"
                >
                  <img
                    src={`https://img.youtube.com/vi/${item.id}/hqdefault.jpg`}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-600 ease-in-out group-hover:scale-108"
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-charcoal/20 flex items-center justify-center transition-colors group-hover:bg-charcoal/40">
                    <div className="w-12 h-12 rounded-full bg-white/95 text-[#0b2e59] flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                      <svg className="w-5 h-5 fill-current ml-1" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </a>
                <h3 className="font-sans text-center text-[#0b2e59] text-[1.1rem] font-semibold mt-2 mb-1 line-clamp-2">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
