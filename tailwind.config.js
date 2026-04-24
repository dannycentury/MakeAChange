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
        'sage-green': '#9CAF88',
        'sage-green-dark': '#7A9B73',
        'sage-green-light': '#B8C9AC',
        'dusty-rose': '#D4A5A5',
        'dusty-rose-dark': '#C08888',
        'dusty-rose-light': '#E8C5C5',
        'charcoal': '#2C2C2C',
        'dark-grey': '#4A4A4A',
        'off-white': '#F9F9F7',
      },
      fontFamily: {
        'sans': ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'subtle': '0 1px 3px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        'card': '12px',
        'button': '8px',
      },
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'sage-green': '#9CAF88',
        'dusty-rose': '#D4A5A5',
        'charcoal': '#2C2C2C',
        'off-white': '#FAFAF8',
      },
      fontFamily: {
        'sans': ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
