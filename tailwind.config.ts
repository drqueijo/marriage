import { Satisfy } from "next/font/google";
import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      backgroundImage: {
        texture: "url('/img/texture.png')",
        flower: "url('/img/flower-gold.png')",
        separator: "url('/img/svg/bar-gold.svg')",
      },
      letterSpacing: {
        full: "8px", // 10px converted to rem
      },
      fontFamily: {
        satisfy: ["Satisfy", ...fontFamily.sans],
        libre: ["Libre Baskerville", ...fontFamily.sans],
        sans: ["var(--font-sans)", ...fontFamily.sans],
        "quicksand-bold-oblique": ["Quicksand Bold Oblique", "sans-serif"],
        "quicksand-bold": ["Quicksand Bold", "sans-serif"],
        "quicksand-book-oblique": ["Quicksand Book Oblique", "sans-serif"],
        "quicksand-book": ["Quicksand Book", "sans-serif"],
        "quicksand-dash": ["Quicksand Dash", "sans-serif"],
        "quicksand-light-oblique": ["Quicksand Light Oblique", "sans-serif"],
        "quicksand-light": ["Quicksand Light", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
