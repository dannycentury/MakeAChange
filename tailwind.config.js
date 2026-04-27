/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'sage-green': '#B2C2A2',
        'sage-green-dark': '#7A9B73',
        'sage-green-light': '#D4E0C8',
        'dusty-rose': '#E2A4A4',
        'dusty-rose-dark': '#C08888',
        'dusty-rose-light': '#F0C9C9',
        'muted-yellow': '#F3E5AB',
        'charcoal': '#2C2C2C',
        'dark-grey': '#4A4A4A',
        'off-white': '#FAFAF8',
      },
      fontFamily: {
        'sans': ['Fredoka', 'Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'hard': '8px 8px 0px 0px #2C2C2C',
        'hard-sm': '4px 4px 0px 0px #2C2C2C',
        'hard-lg': '12px 12px 0px 0px #2C2C2C',
      },
      borderRadius: {
        'card': '16px',
        'button': '32px',
      },
    },
  },
  plugins: [],
}
