/**
 * tailwind.config.snippet.js
 * ---------------------------------------------------------------
 * Merge this into your existing tailwind.config.js `theme.extend`.
 * These are the custom colors, fonts, and animation used by
 * HeroSection.jsx.
 * ---------------------------------------------------------------
 */

module.exports = {
  theme: {
    extend: {
      colors: {
        ivory: '#F3EEE2',
        'ivory-deep': '#E9E0CB',
        charcoal: '#201D18',
        stone: '#8C8371',
        'stone-light': '#B9B0A0',
        green: '#2E4A3B',
        gold: '#B58B3E',
        'navy-dark': '#14181C',
        // New: matches the hero backdrop gradient in hero-globals.css
        'navy-glow': '#23405F',
        'navy-abyss': '#05070A',
        cream: '#F3EEE2',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      keyframes: {
        'scroll-pulse': {
          '0%': { top: '-100%' },
          '60%': { top: '100%' },
          '100%': { top: '100%' },
        },
      },
      animation: {
        'scroll-pulse': 'scroll-pulse 1.8s ease-in-out infinite',
      },
    },
  },
};
