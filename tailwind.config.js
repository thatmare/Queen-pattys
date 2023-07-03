/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        celadon: '#C9F0E0',
        gunMetal: '#1D2939',
        blackInput: '#252D37',
        strokeInput: '#D4C5C5',
        errorRed: '#E63946',
      },
    },
  },
  plugins: [],
}
