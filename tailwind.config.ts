import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: '#2B5A8C',
          dark: '#173654',
          light: '#B7D2E8',
        },
        pink: {
          DEFAULT: '#D9668B',
          dark: '#A83E5F',
          light: '#F2C6D3',
        },
        ink: '#1F2933',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        display: ['var(--font-display)'],
      },
    },
  },
  plugins: [],
};

export default config;
