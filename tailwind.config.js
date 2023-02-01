/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    {
      pattern: /bg-/,
    }
  ],
  theme: {
    extend: {
      colors: {
        'blacknew': {
          '100': '#161717'
        },
        grey: {
          '80': '#494D51',
          '70': '#677079',
          '60': '#828A93',
          '40': '#AFB7BE',
          '30': '#D6D7D8',
        },
        'whitenew': {
          '100': '#F8F8F8',
        },
        accent: '#11CB79',
        error: '#EB6565',
        warning: '#E89D45',
        success: '#70B877',
        indicative: '#4BA6A0',
        active: '#68AC6F',
        callSpread: '#7991DA',
        putSpread: '#95B221',
        butterFly: '#8B78CB'
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(267.79deg, #11CB79 42.5%, #11A692 67.51%, #002366 99.18%)',
        'main-gradient': 'linear-gradient(270.15deg, #11CB79 -4.2%, #11A692 41.69%, #002366 99.8%)',
        'diamond-gradient': 'radial-gradient(197.31% 198.01% at 47.44% -82.95%, rgba(17, 203, 121, 0.16) 0%, rgba(17, 203, 121, 0) 100%)',
        'diamond2-gradient': 'radial-gradient(189.77% 193.68% at 46.79% -80%, rgba(17, 203, 121, 0.16) 0%, rgba(17, 203, 121, 0) 100%)'
      }
    },
  },
  plugins: [],
}
