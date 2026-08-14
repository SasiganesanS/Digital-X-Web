/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backdropBlur: {
        lg: "16px",
        "2xl": "40px",
      },
      blur: {
        "2xl": "40px",
        "3xl": "64px",
        "[100px]": "100px",
      },
      borderRadius: {
        "3xl": "1.5rem",
        "4xl": "2rem",
        "5xl": "3rem",
      },
      colors: {
        primary: {
          DEFAULT: "#FF2B2B", // Primary Brand Red
          light: "#FF5252",
          dark: "#E51D1D", // Hover Red
        },
        secondary: {
          DEFAULT: "#111111", // Primary heading text
          light: "#555555", // Body text
          dark: "#000000",
        },
        background: {
          DEFAULT: "#FFFFFF", // Pure white primary background
          secondary: "#FCFCFD",
          alt: "#FAFAFC",
          hover: "#FAFAFA",
        },
        "brand-red": "#FF2B2B",
        "dark-red": "#E51D1D",
        "dark-surface": "#111111",
        text: {
          DEFAULT: "#111111",
          light: "#555555",
          lighter: "#7A7A7A",
          muted: "#8E8E8E",
        },
        ui: {
          DEFAULT: "#FAFAFA",
          light: "#FAFAFA",
          dark: "#ECECEC",
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [],
};
