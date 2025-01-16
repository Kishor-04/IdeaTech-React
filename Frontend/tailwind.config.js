/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        'custom-blue': {
          100: '#00AFEF',  // main blue
        },
        'custom-gray': {
          100: '#fffafa',  // main gray
          200:"#f4f4f6"
        }
      },
      boxShadow: {
        'custom-dark-500': '0 3px 4px rgba(0, 0, 0, 0.4)',
        'custom-dark-400': '0 2px 2px rgba(0, 0, 0, 0.3)',

      },
    },
  },
  plugins: [],
}

