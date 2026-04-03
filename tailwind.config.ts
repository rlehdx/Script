import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        bg: {
          primary: "#0F172A",
          secondary: "#1E293B",
          card: "#162032",
        },
        accent: {
          purple: "#7C3AED",
          indigo: "#4F46E5",
        },
        border: {
          DEFAULT: "rgba(255,255,255,0.08)",
          hover: "rgba(255,255,255,0.16)",
        },
      },
      backgroundImage: {
        "accent-gradient": "linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)",
        "accent-gradient-hover": "linear-gradient(135deg, #6D28D9 0%, #4338CA 100%)",
        "card-gradient": "linear-gradient(135deg, rgba(124,58,237,0.08) 0%, rgba(79,70,229,0.04) 100%)",
        "hero-glow": "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(124,58,237,0.3), transparent)",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        shimmer: "shimmer 2s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
