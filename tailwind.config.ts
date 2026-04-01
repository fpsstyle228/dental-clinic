import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0a7ea4",
          dark: "#075d79",
        },
        muted: "#6b7280",
      },
      fontFamily: {
        sans: ["SourceSans3", "sans-serif"],
      },
      maxWidth: {
        container: "1100px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.03)",
      },
      borderRadius: {
        xl: "12px",
      },
    },
  },
  plugins: [],
};

export default config;
