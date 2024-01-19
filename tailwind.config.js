/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito Sans', 'sans-serif'],
      },
      fontSize: {
        'homepage-items': '14px',
        'detail-page': '16px',
      },
      colors: {
        'dark-blue': 'hsl(209, 23%, 22%)',
        'very-dark-blue-bg': 'hsl(207, 26%, 17%)',
        'very-dark-blue-text': 'hsl(200, 15%, 8%)',
        'dark-gray-input': 'hsl(0, 0%, 52%)',
        'very-light-gray-bg': 'hsl(0, 0%, 98%)',
        white: 'hsl(0, 0%, 100%)',
      },
    },
  },
  plugins: [],
}
