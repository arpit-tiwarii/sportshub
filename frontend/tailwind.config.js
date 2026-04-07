/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ff5722", // Energetic Orange
        secondary: "#1d4ed8", // Deep blue
        dark: {
          900: "#09090b",
          800: "#18181b",
          700: "#27272a",
        },
        light: "#fafafa"
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
