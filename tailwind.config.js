/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        sage: "#7D9B76",
        beige: "#F5EFE6",
        rose: "#C9896A",
        cream: "#FDFAF5",
        charcoal: "#2D2D2D",
        "sage-dark": "#5E7A58",
        "sage-light": "#A8C1A2",
        "rose-dark": "#A8674A",
        "beige-dark": "#E8DDD0",
      },
      fontFamily: {
        heading: ["Cormorant Garamond", "serif"],
        body: ["DM Sans", "sans-serif"],
      },
      borderRadius: {
        none: "0px",
        sm: "0px",
        DEFAULT: "0px",
        md: "0px",
        lg: "0px",
        xl: "0px",
        "2xl": "0px",
        "3xl": "0px",
        full: "0px",
      },
    },
  },
  plugins: [],
}