/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ffe049",
        primary2: "#ffca22",
        danger: "#ff3d00",
        danger2: "#ff3d00",
        dark: "#393E46",
        dark2: "#222831",
        white: "#fafafa",
        lightgrey: "#ebebeb",
        grey: "#c4c4c4",
      },
      screens: {
        "2xs": "375px",
        xs: "430px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
