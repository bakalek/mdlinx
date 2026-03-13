import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mdlinx: {
          teal: "#007E73",
          navy: "#13284C",
          body: "#202529",
          secondary: "#4C5761",
          muted: "#626669",
          light: "#F5F7F8",
          red: "#DF0B0B",
        },
      },
      fontFamily: {
        sans: ["IBM Plex Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["IBM Plex Serif", "Georgia", "serif"],
      },
      boxShadow: {
        panel: "0 20px 40px rgba(19, 40, 76, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
