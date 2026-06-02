import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#A04000",
        secondary: "#F5F5DC",
        accent: "#D35400"
      },
      fontFamily: {
        heading: ["Oswald"],
        sans: ["Sora"]
      }
    }
  }
} satisfies Config;