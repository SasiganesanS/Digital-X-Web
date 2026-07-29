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
          DEFAULT: "#E31D2E", // Brand Red
          light: "#ff3b4d",
          dark: "#991A23",
        },
        secondary: {
          DEFAULT: "#111111", // Primary text / black color
          light: "#575757",
          dark: "#000000",
        },
        background: {
          DEFAULT: "#f1eaeaff", // Light primary background
        },
        "brand-red": "#E31D2E",
        "dark-red": "#991A23",
        "dark-surface": "#1B1B1B",
        text: {
          DEFAULT: "#111111",
          light: "#575757",
          lighter: "#8B8B8B",
        },
        ui: {
          DEFAULT: "#f7f3f3ff",
          light: "#E5E5E5",
          dark: "#BEBEBE",
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
