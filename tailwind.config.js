/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      keyframes: {
        blink: {
          "0%, 100%": { fill: "#6C6490"},
          "50%": { fill: "#8d85c1"}
        }
      },
      animation: {
        blink: "blink 1s ease-in-out infinite"
      },
      colors: {
        custom: {
          bg: "#000000",
          semiBg1: "#101010",
          semiBg2: "#1b1b1b",
          semiBg3: "#2e2e2e",
          semiBg4: "#3d3d3d",
          darkPurple: "#0f030f",
          primary: "#892CDC",
          secondary: "#52057B",
          accent: "#BC6FF1",
          text: "#FFFFFF",
        },
        fontFamily: {
          'poppins': ['Poppins','sans-serif'],
        },
        fill: {
          custom: {
            primary: "#892CDC",
            secondary: "#52057B",
            accent: "#BC6FF1",
            text: "#FFFFFF",
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require('@tailwindcss/typography'),
    require("tw-elements/plugin.cjs"),
    require('tailwind-scrollbar'),
  ],
};
