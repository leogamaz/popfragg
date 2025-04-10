/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#222831",
        secondary: "#31363F",
        accent: "#76ABAE",
        details: "#EEEEEE",
      },
      fontFamily: {
        rajdhani: ["Goldman", "sans-serif"],
      },
    },
  },
  plugins: [],
};
