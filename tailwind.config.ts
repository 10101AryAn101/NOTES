import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#050816',
        card: '#0f172a',
        accent: '#38bdf8',
      },
      boxShadow: {
        soft: '0 18px 40px rgba(15,23,42,0.35)',
      },
    },
  },
  plugins: [],
};

export default config;
