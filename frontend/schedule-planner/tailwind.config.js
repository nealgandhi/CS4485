/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'theme-orange': 'rgb(252, 103, 54)',
        'theme-peach': 'rgb(255, 176, 176)',
        'theme-navy': 'rgb(12, 45, 87)',
        'navy-dark': 'rgb(8, 33, 64)',
      },
    },
  },
  plugins: [],
}