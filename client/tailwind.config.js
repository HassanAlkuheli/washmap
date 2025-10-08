/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0891B2', // Cyan-600 (Teal/Blue)
          dark: '#0E7490',    // Cyan-700
          light: '#06B6D4',   // Cyan-500
        },
        success: '#10B981',   // Green-500
        warning: '#F59E0B',   // Amber-500
        danger: '#EF4444',    // Red-500
      }
    },
  },
  plugins: [],
}
