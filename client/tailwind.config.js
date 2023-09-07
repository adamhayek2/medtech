/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'futur': ['futur', 'sans-serif'],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'grey': '#EFEDEE',
      'primary': '#3540D8',
      'secondary': '#161B59',
      'tertiary': '#EBECFF',
    },
  },
  plugins: [],
}

