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
          // PRIMARY BLUES (Official & Supporting Palette)
          navy: "#22254E",        // Dark Blue (Official Supporting)
          indigo: "#44499C",      // Logo Blue (Official)
          sky: "#009CDE",         // Cyan (Official Extended)

          // PRIMARY GREENS (Official & Supporting Palette)
          sea: "#009F4D",         // Logo Green (Official)
          forest: "#008743",      // Compliant Green (Official Supporting)
          darkGreen: "#005027",   // Dark Green (Official Supporting)

          // ACCENT COLORS (Official Extended Palette)
          gold: "#FFC600",        // Yellow (Official Extended)
          amber: "#FF8F00",       // Orange (Official Extended)
          red: "#F83125",         // Red (Official Extended)
          purple: "#9F3CC9",      // Purple (Official Extended)
          brown: "#8F5201",       // Brown (Official Extended)

          // NEUTRALS (Official & Supporting Palette)
          cream: "#f7f6f5",       // Faded White (Official)
          slate: "#636262",       // Dark Gray (Official Extended)
          stone: "#636262",       // Dark Gray (Official Extended)
          cloud: "#C6C5C4",       // Light Gray (Official Extended)
          black: "#000000"        // Black (Official Extended)
        },
        surface: {
          base: "#f7f6f5",        // Faded White (Official)
          card: "#ffffff",        // White
          overlay: "rgba(34,37,78,0.04)",  // Dark Blue with opacity
          lightBlue: "#dcf2fd",   // Light Blue (Official Supporting)
          lightGreen: "#dff0e3"   // Light Green (Official Supporting)
        }
      },
      fontFamily: {
        heading: ["'Source Sans 3'", ...defaultTheme.fontFamily.sans],
        sans: ["Inter", ...defaultTheme.fontFamily.sans]
      },
      boxShadow: {
        focus: "0 0 0 4px rgba(68, 73, 156, 0.25)",         // Logo Blue
        card: "0 18px 50px -24px rgba(17, 24, 39, 0.45)",
        subtle: "0 10px 30px -20px rgba(34, 37, 78, 0.35)"  // Dark Blue
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.75rem"
      },
      backgroundImage: {
        "hero-radial": "radial-gradient(circle at 20% 20%, rgba(0,156,222,0.18), transparent 55%), radial-gradient(circle at 80% 10%, rgba(0,159,77,0.18), transparent 50%)",  // Cyan + Logo Green
        "card-gradient": "linear-gradient(135deg, rgba(68,73,156,0.09) 0%, rgba(0,159,77,0.05) 100%)"  // Logo Blue + Logo Green
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
            },
            'p strong': {
              color: theme("colors.brand.slate")
            }
          }
        }
      })
    }
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")]
};
