import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        parchment: '#F6F3EF',
        blue: {
          DEFAULT: '#16202E',
          dark: '#0B121B',
          light: '#4A6178',
        },
        pink: {
          DEFAULT: '#E0A526',
          dark: '#B9840F',
          light: '#F2D28A',
        },
        ink: '#24232A',
        line: '#DEDAD2',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        display: ['var(--font-display)'],
        mono: ['var(--font-mono)'],
      },
    },
  },
  plugins: [],
};

export default config;
