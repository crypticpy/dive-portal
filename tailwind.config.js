module.exports = {
  content: [
    "./_layouts/**/*.html",
    "./_includes/**/*.html",
    "./cohorts/**/*.md",
    "./cohorts/**/*.html",
    "./index.md",
    "./assets/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0C2340",
        secondary: "#0076CE",
        accent: "#F4A261",
        neutral: "#F8F9FA"
      }
    }
  },
  plugins: []
};
