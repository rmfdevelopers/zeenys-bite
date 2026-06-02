import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { 
    extend: {
      colors: { 
        primary: "#111111", 
        secondary: "#FDFBF7", 
        accent: "#D4AF37" 
      },
      fontFamily: { 
        heading: ["Playfair Display"], 
        sans: ["Outfit"] 
      }
    }
  }
} satisfies Config;