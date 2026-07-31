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
          DEFAULT: '#1F4E79',
          dark: '#163A5C',
          light: '#4A7FB5',
        },
        pink: {
          DEFAULT: '#C2447E',
          dark: '#9C3564',
          light: '#E893B7',
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
