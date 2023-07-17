/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blackBtn: '#2D3137',
        blackInput: '#252D37',
        celadon: '#C9F0E0',
        errorRed: '#E63946',
        gunMetal: '#1D2939',
        strokeInput: '#D4C5C5',
        yellowTimer: '#CBB978',
        kitchenText: '#D4C5C5',
        greenConfirm: '#67BC99'
      },
    },
  },
  plugins: [],
}
