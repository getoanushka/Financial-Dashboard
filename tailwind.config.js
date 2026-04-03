/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class based dark mode mapping
  theme: {
    extend: {
      colors: {
        'sbi-blue': '#3B82F6', // Vibrant blue
        'sbi-dark': '#4F46E5', // Deep indigo
      }
    },
  },
  plugins: [],
}
