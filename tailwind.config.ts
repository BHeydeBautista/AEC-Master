import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0b0f14",
        panel: "#111827",
        primary: "#22d3ee",
        primarySoft: "#67e8f9",
        accent: "#0ea5e9",
        textMain: "#e5e7eb",
        textMuted: "#9ca3af",
      },
    },
  },
  plugins: [],
};

export default config;
