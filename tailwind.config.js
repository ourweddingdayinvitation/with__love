/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", 
  ],
  theme: {
    extend: {
      fontFamily: {
        'amsterdam': ['"Amsterdam"', 'Arial', 'serif'], 
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
        'greatvibes': ['"Great Vibes"', 'cursive'],
        sacramento: ['Sacramento', 'cursive'],
        engagement: ['Engagement', 'cursive'],
      }
    },
  },
  plugins: [],
}
