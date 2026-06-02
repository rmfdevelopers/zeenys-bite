import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: {
    colors: { primary: "#9A3412", secondary: "#FEF3C7", accent: "#EA580C" },
    fontFamily: { heading: ["Oswald"], sans: ["Sora"] }
  }}
} satisfies Config;