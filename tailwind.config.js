/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    fontFamily: {
      sans: ['poppins', 'sans-serif'],
      roboto: ['Roboto', 'sans-serif']
    },
    extend: {
      fontFamily: {
        // sans: ['Roboto', ' sans-serif'],
        sans: ['Poppins', 'sans-serif']
      },
      colors: {
        blackOne: '#121212',
        blackFondo: '#191a1d',
        grisOne: '#2b2f36',
        grisTwo: '#26292f',
        grisClaro: '#97999d'
      }
    }
  },
  plugins: []
}
