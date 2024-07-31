/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '-5px -5px 12px -7px rgba(0,0,0,0.7)',
      },
      gridTemplateColumns: {
        'auto-fill-100': 'repeat(auto-fill, minmax(288px, 1fr))',
        'auto-fit-100': 'repeat(auto-fit, minmax(100px, 1fr))',
      },
      fontFamily: {
        'poppins':['Poppins', 'sans-serif'],
        'dancingscript':['Dancing Script', 'sans-serif']
      },
    },
  },
  plugins: [],
}

