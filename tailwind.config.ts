import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#081226",
        navy: "#0F2A5C",
        royal: "#1557B0",
        sky: "#3E8EDE",
        gold: "#F5A623",
        "gold-soft": "#FFC65C",
        paper: "#F7F9FC",
        mist: "#D7E4F6",
        fog: "#EDF1F7",
      },
      fontFamily: {
        jakarta: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
