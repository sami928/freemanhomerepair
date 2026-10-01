/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Deep evergreen — Pacific Northwest, trustworthy, not "corporate blue".
        brand: {
          50: '#eef7f3',
          100: '#d5ece2',
          200: '#acd8c5',
          300: '#7bbea3',
          400: '#4c9f80',
          500: '#2f8366',
          600: '#226952',
          700: '#1c5443',
          800: '#174337',
          900: '#12352c',
          950: '#0a201a',
        },
        // Safety orange — reserved for calls to action so they always stand out.
        accent: {
          50: '#fff6ed',
          100: '#ffead4',
          200: '#ffd1a8',
          300: '#ffb070',
          400: '#ff8a3d',
          500: '#f76b15',
          600: '#e8540b',
          700: '#c03f0b',
          800: '#983311',
          900: '#7a2c11',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Archivo"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
