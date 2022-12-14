/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'gray':'#F5F5F5',
        'green':'#27AE60',
        'white':'#FFFFFF',
        'pink':'#EB5757',
        'black':'#171717',
        'category':'#828282'
      }
    },
  },
  plugins: [],
}
