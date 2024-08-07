import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        texture: "url('/img/texture.png')",
        flower: "url('/img/flower-gold.png')",
        separator: "url('/img/svg/bar-gold.svg')",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        "quicksand-bold-oblique": ["Quicksand Bold Oblique", "sans-serif"],
        "quicksand-bold": ["Quicksand Bold", "sans-serif"],
        "quicksand-book-oblique": ["Quicksand Book Oblique", "sans-serif"],
        "quicksand-book": ["Quicksand Book", "sans-serif"],
        "quicksand-dash": ["Quicksand Dash", "sans-serif"],
        "quicksand-light-oblique": ["Quicksand Light Oblique", "sans-serif"],
        "quicksand-light": ["Quicksand Light", "sans-serif"],
        satisfy: ["Satisfy", "sans-serif"],
        libre: ["Libre Baskerville", "sans-serif"],
        "alto-greeting": ["Alto Greeting", "sans-serif"],
        "rouge-script": ["Rouge Script", "sans-serif"],
      },
      letterSpacing: {
        full: "8px", // 10px converted to rem
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
