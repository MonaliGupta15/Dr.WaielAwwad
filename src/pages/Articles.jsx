import React from 'react';
import Footer from '../components/Footer';
import img32 from '../assets/32.png';
import img14 from '../assets/14.webp';
import img11 from '../assets/11.jpeg';
import profilePortrait from '../assets/Waiel S.H. Awwad.webp';

// Authentically scraped and downloaded lead article images
import article1 from '../assets/article_1.jpg';
import article3 from '../assets/article_3.jpg';
import article4 from '../assets/article_4.jpg';
import article5 from '../assets/article_5.png';
import article7 from '../assets/article_7.jpg';
import article10 from '../assets/article_10.webp';
import article14 from '../assets/article_14.jpg';
import article15 from '../assets/article_15.jpg';
import articleNew1 from '../assets/article_new_1.jpeg';
import articleNew2 from '../assets/article_new_2.jpg';

const articles = [
  {
    title: 'When dust settles on the shadow war waged in Iran',
    publication: 'The New Indian Express',
    date: 'January 2026',
    excerpt: 'Analyzing the strategic shadow war waged in Iran, its domestic power struggles, external geopolitical pressures, and the potential energy and economic consequences for India.',
    readTime: '8 min read',
    url: 'https://www.newindianexpress.com/opinions/2026/jan/16/when-dust-settles-on-the-shadow-war-waged-in-iran',
    image: articleNew1,
  },
  {
    title: 'Revival of \'good terrorism\': How Syria became the battleground for global hypocrisy',
    publication: 'The New Indian Express',
    date: 'December 2024',
    excerpt: 'A critical examination of the fall of the Assad regime in Syria and the geopolitical exploitation of extremist groups as covert strategic instruments by global powers.',
    readTime: '7 min read',
    url: 'https://www.newindianexpress.com/opinions/2024/dec/08/revival-of-good-terrorism-how-syria-became-the-battleground-for-global-hypocrisy',
    image: articleNew2,
  },
  {
    title: 'Trump is prolonging Iran war to appease his billionaire associates, fulfill Israel\'s agenda: Middle East expert Waiel Awwad',
    publication: 'ANI News',
    date: 'March 2026',
    excerpt: 'Analyzing US foreign policy, Middle East expert Dr. Waiel Awwad argues that military escalations against Iran are fueled by strategic business associations and regional agendas.',
    readTime: '8 min read',
    url: 'https://www.aninews.in/news/world/asia/trump-is-prolonging-iran-war-to-appease-his-billionaire-associates-fulfill-israels-agenda-middle-east-expert-waiel-awwad20260330141725/',
    image: article1,
  },
  {
    title: 'Syrian-born Waiel Awwad elected President of Foreign Correspondents’ Club of South Asia',
    publication: 'The Print',
    date: 'July 2025',
    excerpt: 'Renowned international journalist Dr. Waiel Awwad elected to lead the FCC of South Asia, representing foreign media voices and strategic correspondence from the region.',
    readTime: '5 min read',
    url: 'https://theprint.in/india/syrian-born-waiel-awwad-elected-president-of-foreign-correspondents-club-of-south-asia/2636987/',
    image: img32,
  },
  {
    title: 'Only way for USA to win now is to drop nuclear dirty bomb on Iran: Waiel Awwad\'s prediction',
    publication: 'Hindustan Times Video',
    date: 'November 2025',
    excerpt: 'A critical analysis of the escalating conflict, warning of the extreme strategic deadlocks and predictions facing global military involvement in West Asia.',
    readTime: '6 min read',
    url: 'https://www.hindustantimes.com/videos/world-news/only-way-for-usa-to-win-now-is-to-drop-nuclear-dirty-bomb-on-iran-waiel-awwads-scary-prediction-101782995523066.html',
    image: article3,
  },
  {
    title: 'Why not attack North Korea which has nukes? Waiel Awwad demolishes Trump\'s Iran war justification',
    publication: 'Hindustan Times Video',
    date: 'September 2025',
    excerpt: 'Deconstructing foreign policy justifications, comparing international strategic postures, and challenging military rationales in the Middle East.',
    readTime: '7 min read',
    url: 'https://www.hindustantimes.com/videos/world-news/why-not-attack-north-korea-which-has-nukes-waiel-awwad-demolishes-trump-s-iran-war-justification-101773145488983.html',
    image: article4,
  },
  {
    title: 'Death of President Ebrahim Raisi: Iran at a crossroads',
    publication: 'Organiser',
    date: 'May 2024',
    excerpt: 'An in-depth analysis on the sudden demise of Iranian President Ebrahim Raisi, exploring the implications on domestic power structures and the shifting balance of power in West Asia.',
    readTime: '8 min read',
    url: 'https://organiser.org/2024/05/25/239423/international/death-of-president-ebrahim-raisi-iran-at-a-crossroads/',
    image: article5,
  },
  {
    title: 'Red Lines Crossed: A Region on the Brink',
    publication: 'The New Indian Express',
    date: 'June 2025',
    excerpt: 'Analyzing the geopolitical fallout of recent military developments, strategic red lines, and the security environment facing key powers across the West Asian region.',
    readTime: '9 min read',
    url: 'https://www.newindianexpress.com/nation/2025/Jun/24/red-lines-crossed-a-region-on-the-brink',
    image: article7,
  },
  {
    title: 'Solidarity in Journalism: A Tribute to Frontline Reporters in Gaza',
    publication: 'The New Indian Express',
    date: 'November 2024',
    excerpt: 'A heartfelt tribute to the journalists and media personnel who lost their lives in conflict zones, documenting the immense risks and ethical boundaries of frontline reporting.',
    readTime: '6 min read',
    url: 'https://www.newindianexpress.com/web-only/2024/Nov/29/on-the-intl-day-of-solidarity-with-the-palestinian-people-a-tribute-to-the-journalists-killed-in-gaza',
    image: article10,
  },
  {
    title: 'The Temple of Preah Vihear: Analyzing the Cambodia-Thailand Border Dispute',
    publication: 'Rai Al Youm',
    date: 'July 2023',
    excerpt: 'A historical and legal retrospective on the territorial dispute surrounding the Preah Vihear Temple, analyzing ICJ rulings and their regional security implications.',
    readTime: '12 min read',
    url: 'https://www.raialyoum.com/%d8%a7%d9%84%d8%b5%d8%b1%d8%a7%d8%b9-%d8%a7%d9%84%d8%ad%d8%af%d9%88%d8%af%d9%8a-%d8%a7%d9%84%d8%ab%d9%82%d8%a7%d9%81%d9%8a-%d8%a8%d9%8a%d9%86-%d9%83%d9%85%d8%a8%d9%88%d8%af%d9%8a%d8%a7-%d9%88%d8%aa/',
    image: img14,
  },
  {
    title: 'Israel\'s escalating war on Gaza and Lebanon: A humanitarian crisis unfolds',
    publication: 'Financial Express',
    date: 'September 2024',
    excerpt: 'A critical review of the worsening humanitarian situation, assessing international law, military strategies, and the geopolitical fallout of the escalating conflict.',
    readTime: '8 min read',
    url: 'https://www.financialexpress.com/opinion/israels-escalating-war-on-gaza-and-lebanon-a-humanitarian-crisis-unfolds/3626001/',
    image: article14,
  },
  {
    title: 'The legally killed children of Palestine: Who is Israel at war with?',
    publication: 'The New Indian Express',
    date: 'October 2024',
    excerpt: 'Challenging the moral and legal justifications of modern conflicts, analyzing civilian casualties, and the long-term impact on regional peace and human rights.',
    readTime: '9 min read',
    url: 'https://www.newindianexpress.com/world/2024/Oct/09/the-legally-killed-children-of-palestine-who-is-israel-at-war-with',
    image: article15,
  },
  {
    title: 'Strategic Partnerships: Analyzing the US-India SOSA and MQ-9B Deals',
    publication: 'Defense Policy Analysis',
    date: 'June 2023',
    excerpt: "Detailing the implications of the Security of Military Supplies Agreement (SOSA) and the procurement of MQ-9B aircraft on India's defense readiness and Indo-Pacific security.",
    readTime: '8 min read',
    url: 'https://www.raialyoum.com/%d9%81%d9%88%d8%b2-%d8%aa%d8%b1%d8%a7%d9%85%d8%a8-%d9%85%d8%b1%d8%a9-%d8%a3%d8%ae%d8%b1%d9%89-%d9%87%d9%84-%d8%aa%d8%b9%d8%b2%d8%b2-%d8%a7%d9%84%d9%87%d9%86%d8%af-%d9%85%d9%83%d8%a7%d9%86%d8%aa%d9%87/',
    image: img11,
  },
];

export default function Articles() {
  return (
    <div className="bg-ivory min-h-screen text-charcoal flex flex-col justify-between pt-[14vh]">
      <div className="max-w-[1400px] mx-auto px-[6vw] w-full mb-24">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 lg:mb-24 border-b border-charcoal/10 pb-12 lg:pb-16">
          <div className="max-w-[750px]">
            <span className="font-mono text-xs tracking-[0.28em] uppercase text-stone mb-4 block">
              Archive / Writings
            </span>
            <h1 className="font-display font-normal text-[clamp(42px,7vw,110px)] leading-[0.9] tracking-[-0.03em] uppercase font-serif">
              Articles & Columns
            </h1>
            <p className="max-w-[52ch] text-stone text-[15px] lg:text-[16px] leading-[1.8] mt-6">
              A comprehensive archive of columns, strategic studies, and editorial essays published in leading 
              foreign policy journals and global newspapers.
            </p>
          </div>
          {/* Portrait Image on the Top Right */}
          <div className="relative w-full max-w-[280px] md:w-[220px] lg:w-[260px] shrink-0 self-center md:self-end">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-charcoal/15 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.12)]">
              <img 
                src={profilePortrait} 
                alt="Dr. Waiel Awwad Portrait" 
                className="w-full h-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-charcoal/15 via-transparent to-transparent" />
            </div>
            {/* Elegant corner accents */}
            <div className="pointer-events-none absolute -left-1 -top-1 h-4 w-4 border-l border-t border-gold/60" />
            <div className="pointer-events-none absolute -right-1 -bottom-1 h-4 w-4 border-r border-b border-gold/60" />
          </div>
        </div>

        {/* Articles List */}
        <div className="space-y-12 lg:space-y-16">
          {articles.map((article, index) => (
            <div key={index} className="group border-t border-charcoal/10 pt-8 lg:pt-10 flex flex-col md:flex-row gap-6 lg:gap-10 items-start">
              {/* Article Image */}
              <div className="relative w-full md:w-[180px] lg:w-[220px] aspect-[4/3] md:aspect-square lg:aspect-[4/3] overflow-hidden rounded-xl bg-stone-light/10 border border-charcoal/5 shrink-0">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
              </div>

              {/* Content Grid */}
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_2.2fr_0.8fr] gap-4 lg:gap-8 items-start w-full">
                {/* Publication Details */}
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-gold font-medium">
                    {article.publication}
                  </span>
                  <span className="font-mono text-xs text-stone-gray/60 mt-1">
                    {article.date}
                  </span>
                </div>

                {/* Title & Excerpt */}
                <div className="space-y-3">
                  <h3 className="font-display text-xl lg:text-2xl leading-snug group-hover:text-gold transition-colors duration-300 font-medium font-serif">
                    {article.url ? (
                      <a 
                        href={article.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:underline decoration-gold/50 underline-offset-4"
                      >
                        {article.title}
                      </a>
                    ) : (
                      article.title
                    )}
                  </h3>
                  <p className="text-stone text-[14px] lg:text-[15px] leading-[1.6] max-w-[65ch]">
                    {article.excerpt}
                  </p>
                </div>

                {/* Link / Read Time / Action */}
                <div className="flex lg:justify-end items-center">
                  {article.url ? (
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[10px] uppercase tracking-[0.2em] text-ivory bg-charcoal hover:bg-gold hover:text-charcoal transition-all duration-300 rounded-full px-5 py-2 shadow-sm font-semibold whitespace-nowrap"
                    >
                      Read Link →
                    </a>
                  ) : (
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-gray/80 border border-charcoal/10 rounded-full px-4 py-1.5 whitespace-nowrap font-medium">
                      {article.readTime}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
