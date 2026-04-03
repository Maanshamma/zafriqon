/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sapphire: '#0A1628',
        'sapphire-mid': '#112240',
        'sapphire-light': '#1E3A5F',
        gold: '#C8A96E',
        'gold-light': '#D4BC8A',
        parchment: '#F8F7F4',
        'parchment-dark': '#F0EDE8',
        card: '#F2F0EC',
        'dark-card': '#111D2E',
        steel: '#8A9AB5',
        'steel-light': '#B8C4D4',
        charcoal: '#2C3E55',
      },
      fontFamily: {
        sans: ['DM Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
      letterSpacing: {
        widest2: '0.2em',
        widest3: '0.3em',
      },
      fontSize: {
        '10px': '10px',
        '11px': '11px',
      },
    },
  },
  plugins: [],
};