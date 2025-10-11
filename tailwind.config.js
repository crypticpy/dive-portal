const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./_layouts/**/*.html",
    "./_includes/**/*.html",
    "./cohorts/**/*.{md,html}",
    "./index.md",
    "./cohorts/index.md",
    "./assets/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#1f2b63",
          indigo: "#3d4ba0",
          sky: "#2e6af7",
          sea: "#009f4d",
          gold: "#f3a712",
          cream: "#f8f3eb",
          slate: "#1f2933",
          stone: "#6b7280"
        },
        surface: {
          base: "#f5f6fb",
          card: "#ffffff",
          overlay: "rgba(31,43,99,0.04)"
        }
      },
      fontFamily: {
        heading: ["'Source Sans 3'", ...defaultTheme.fontFamily.sans],
        sans: ["Inter", ...defaultTheme.fontFamily.sans]
      },
      boxShadow: {
        focus: "0 0 0 4px rgba(46, 106, 247, 0.25)",
        card: "0 18px 50px -24px rgba(17, 24, 39, 0.45)",
        subtle: "0 10px 30px -20px rgba(31, 43, 99, 0.35)"
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.75rem"
      },
      backgroundImage: {
        "hero-radial": "radial-gradient(circle at 20% 20%, rgba(46,106,247,0.18), transparent 55%), radial-gradient(circle at 80% 10%, rgba(0,159,77,0.18), transparent 50%)",
        "card-gradient": "linear-gradient(135deg, rgba(61,75,160,0.09) 0%, rgba(0,159,77,0.05) 100%)"
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem"
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: theme("colors.brand.slate"),
            a: {
              color: theme("colors.brand.sky"),
              fontWeight: theme("fontWeight.medium"),
              textDecoration: "none",
              '&:hover': {
                color: theme("colors.brand.indigo"),
                textDecoration: "underline"
              }
            },
            h1: { fontFamily: theme("fontFamily.heading"), color: theme("colors.brand.navy") },
            h2: { fontFamily: theme("fontFamily.heading"), color: theme("colors.brand.navy") },
            h3: { fontFamily: theme("fontFamily.heading"), color: theme("colors.brand.navy") },
            blockquote: {
              borderLeftColor: theme("colors.brand.indigo"),
              color: theme("colors.brand.navy"),
              fontStyle: "normal"
            }
          }
        }
      })
    }
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")]
};
