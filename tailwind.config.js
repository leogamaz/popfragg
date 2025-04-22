/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        text: "var(--color-text)",
        bgMain: "var(--color-main-bg)",
        borderLines: "var(--color-border-lines)",
        colorNeon: "var(--color-neon)",
        colorNeonShadow: "var(--color-neon-shadow)",
        colorSubNeon: "var(--color-sub-neon)",
      },
      fontFamily: {
        rajdhani: ["Goldman", "sans-serif"],
      },
    },
  },
  plugins: [],
};
