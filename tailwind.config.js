/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Navy — sampled from the logo shield and wordmark (#1e3a5f = 800).
        brand: {
          50: '#f1f5fa',
          100: '#dfe8f2',
          200: '#bfd0e4',
          300: '#93b0d0',
          400: '#6189b6',
          500: '#3f6a9a',
          600: '#2f5480',
          700: '#26466c',
          800: '#1e3a5f',
          900: '#172d4a',
          950: '#0e1d31',
        },
        // Gold — sampled from the logo tools and rule (#d4a534 = 500).
        // Reserved for calls to action. Gold is light, so text on it must be
        // navy (brand-950), never white; use 700+ for gold text on white.
        accent: {
          50: '#fdf8ec',
          100: '#faefcf',
          200: '#f4dc9c',
          300: '#ecc766',
          400: '#e2b544',
          500: '#d4a534',
          600: '#b98a22',
          700: '#8f6618',
          800: '#7a541d',
          900: '#65451c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Serif to match the logo wordmark.
        display: ['"Noto Serif"', 'Georgia', 'ui-serif', 'serif'],
      },
    },
  },
  plugins: [],
};
