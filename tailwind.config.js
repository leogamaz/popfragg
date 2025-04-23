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
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".hover-neon": {
          transition: "all 0.2s ease-in-out",
          border: "1px solid transparent",
          "&:hover": {
            backgroundColor: "#1e1e1e",
            borderColor: "var(--color-neon)",
            boxShadow: "0 0 5px var(--color-neon), 1px 1px 3px #000",
            color: "var(--color-neon)",
          },
        },
      });
    },
  ],
};
