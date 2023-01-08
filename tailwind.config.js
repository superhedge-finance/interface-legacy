/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'primary-gradient': 'linear-gradient(267.79deg, #11CB79 42.5%, #11A692 67.51%, #002366 99.18%), #161717'
      }
    },
  },
  plugins: [],
}
