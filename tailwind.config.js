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
        "2xl": "40px", // The new, higher-quality blur
      },
      blur: {
        "2xl": "40px",
        "3xl": "64px", // Default blur-3xl
        "[100px]": "100px", // The new, ultra-soft blob blur
      },
      borderRadius: {
        "4xl": "2rem", // You used rounded-4xl
      },
      colors: {
        // Professional Brand Colors
        primary: {
          DEFAULT: "#371445", // Praskla Purple - Brand/CTAs
          light: "#4a1c5e",
          dark: "#2a0e34",
        },
        secondary: {
          DEFAULT: "#10B981", // Emerald Green - Accent/Success
          light: "#34D399",
          dark: "#059669",
        },
        background: {
          DEFAULT: "#FFFFFF", // White - Main background
        },
        text: {
          DEFAULT: "#333333", // Dark Grey - Body text
          light: "#666666",
          lighter: "#999999",
        },
        ui: {
          DEFAULT: "#D1D1D1", // Silver - UI/Borders
          light: "#E5E5E5",
          dark: "#BEBEBE",
        },
        highlight: {
          purple: "#F3E8FF", // Light Purple - Background blobs
          mint: "#A7F3D0", // Light Mint - Background blobs
        },
        // Keep existing colors for compatibility
        tertiary: {
          DEFAULT: "#10B981", // Emerald green as tertiary color
          light: "#34D399",
          dark: "#059669",
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
