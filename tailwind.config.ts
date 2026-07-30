import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Placeholder brand tokens — we'll set the real palette
        // when we design the actual UI in the next step.
        brand: {
          DEFAULT: '#1D9E75',
          dark: '#085041',
          light: '#9FE1CB',
        },
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
