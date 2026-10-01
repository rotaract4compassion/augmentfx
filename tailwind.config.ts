import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1rem', md: '1.5rem', lg: '2rem' },
      screens: { sm: '420px', md: '768px', lg: '1024px', xl: '1280px' },
    },
    extend: {
      colors: {
        royal: {
          DEFAULT: '#17458F',
          deep: '#0E2F66',
          night: '#081B3F',
        },
        gold: {
          DEFAULT: '#F7A81B',
          dark: '#D48A14',
        },
        cream: {
          DEFAULT: '#F8F5F0',
        },
        sky: {
          DEFAULT: '#4A9FDB',
        },
        ribbon: {
          DEFAULT: '#E85D75',
        },
        flag: {
          green: '#1EB53A',
          yellow: '#FCD116',
          blue: '#00A3DD',
          black: '#000000',
        },
        ink: {
          DEFAULT: '#1A1A1A',
          muted: '#4A4A4A',
          subtle: '#7A7A7A',
          ghost: '#ABABAB',
        },
        navy: {
          DEFAULT: '#081B3F',
          700: '#0E2F66',
        },
        sand: {
          DEFAULT: '#F8F5F0',
          dark: '#E8E5D0',
        },
        bronze: {
          DEFAULT: '#F7A81B',
          700: '#D48A14',
        },
        mode: {
          cycling: '#F7A81B', // Using gold as accent for now
          running: '#17458F',
          walking: '#4A9FDB',
        },
      },

      fontFamily: {
        // Anton — display, stencils, numerals
        display: ['var(--font-anton)', 'Impact', 'sans-serif'],
        // Montserrat — all UI
        sans:  ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
      },

      fontSize: {
        // Display — Anton
        'hero':     ['clamp(3.5rem,15vw,8.5rem)', { lineHeight: '0.88', fontWeight: '400' }],
        'headline': ['clamp(2.25rem,7vw,4rem)',   { lineHeight: '0.9',  fontWeight: '400' }],
        'section':  ['clamp(2rem,6vw,3.5rem)',    { lineHeight: '0.9',  fontWeight: '400' }],
        'bib':      ['clamp(2.5rem,10vw,4rem)',   { lineHeight: '0.9',  fontWeight: '400' }],
        // UI — Montserrat
        'label':    ['0.6875rem', { lineHeight: '1',    fontWeight: '700', letterSpacing: '0.25em' }],
        'body-lg':  ['1.125rem',  { lineHeight: '1.65', fontWeight: '400' }],
        'body':     ['1.0625rem', { lineHeight: '1.65', fontWeight: '400' }], // 17px
        'body-sm':  ['0.9375rem', { lineHeight: '1.6',  fontWeight: '400' }],
        'caption':  ['0.8125rem', { lineHeight: '1.4',  fontWeight: '500' }],
      },

      spacing: {
        'section':    '6rem',
        'section-sm': '4rem',
        'page':       '1.25rem',
      },

      maxWidth: {
        'canvas':  '420px',
        'content': '680px',
        'wide':    '1120px',
      },

      borderRadius: {
        'card':   '0px', // V2 relies on shape variety, default to hard edge and apply where needed
        'pill':   '9999px',
        'button': '9999px',
      },

      boxShadow: {
        'card':    '0 2px 20px rgba(8,27,63,0.05)',
        'gold':    '0 4px 24px rgba(247,168,27,0.25)',
      },

      backgroundImage: {
        'navy-depth': 'linear-gradient(160deg,#081B3F 0%,#0E2F66 55%,#17458F 100%)',
      },

      keyframes: {
        'stamp-in': { 
          '0%': { opacity: '0', transform: 'scale(1.2)' }, 
          '60%': { opacity: '1', transform: 'scale(0.95)' }, 
          '100%': { opacity: '1', transform: 'scale(1)' } 
        },
        shimmer: { '0%': { backgroundPosition: '-200% center' }, '100%': { backgroundPosition: '200% center' } },
        'slide-left': { '0%': { opacity: '0', transform: 'translateX(20px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } }
      },

      animation: {
        'stamp-in': 'stamp-in 0.28s cubic-bezier(0.34,1.56,0.64,1) both',
        'shimmer': 'shimmer 2.2s linear infinite',
        'slide-left': 'slide-left 0.2s ease-out both',
      },

      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34,1.56,0.64,1)',
      },
    },
  },
  plugins: [],
}

export default config
