import path from "path";
import type { Config } from "tailwindcss";

const fromRoot = (p: string) => path.join(__dirname, p);

const config = {
  mode: "jit",
  darkMode: "class",
  content: [fromRoot("./app/**/*.+(js|jsx|ts|tsx|mdx|md)")],
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
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
