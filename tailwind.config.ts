/** @type {import('tailwindcss').Config} */

import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        mobile: { max: "780px" },
        widescreen: { min: "780px" },
      },
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        foreground: "rgb(var(--color-foreground) / <alpha-value>)",
        background: "rgb(var(--color-background) / <alpha-value>)",
        front: "rgb(var(--color-front) / <alpha-value>)",
        back: "rgb(var(--color-back) / <alpha-value>)",
      },
      borderRadius: {
        inherit: "inherit",
      },
      transitionDuration: {
        inherit: "inherit",
      },
      fontFamily: {
        poppins: '"Poppins", sans-serif',
        raleway: '"Raleway", sans-serif',
        geistSans: '"Geist Sans", sans-serif',
      },
      zIndex: {
        1: "1",
      },
    },
  },
  plugins: [],
} satisfies Config;
