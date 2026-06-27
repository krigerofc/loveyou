/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#f3ead6',
        'paper-light': '#faf4e6',
        ink: '#3a3026',
        sepia: '#8a6a45',
        rose: '#b56a5b',
        leather: '#5c3d2e',
        'leather-dark': '#3f2a1e',
        gold: '#c4a86b',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'Georgia', 'serif'],
        hand: ['var(--font-hand)', 'cursive'],
        ui: ['var(--font-ui)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        polaroid: '0 12px 28px -10px rgba(58,48,38,0.45)',
        sheet: '0 30px 70px -24px rgba(0,0,0,0.6)',
      },
    },
  },
  plugins: [],
};
