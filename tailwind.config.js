/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Inter", "system-ui", "sans-serif"],
        body:    ["Inter", "system-ui", "sans-serif"],
        mono:    ["JetBrains Mono", "monospace"],
        sans:    ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        obsidian: {
          DEFAULT: "#0D0D0D",
          50:  "#f5f5f5",
          100: "#e8e8e8",
          200: "#c8c8c8",
          300: "#a0a0a0",
          400: "#737373",
          500: "#525252",
          600: "#3d3d3d",
          700: "#292929",
          800: "#1a1a1a",
          900: "#0D0D0D",
          950: "#080808",
        },
        charcoal: {
          DEFAULT: "#161616",
          light:   "#1e1e1e",
          card:    "#131313",
          border:  "rgba(255,255,255,0.06)",
        },
        champagne: {
          DEFAULT: "#C9A84C",
          light:   "#DFC06A",
          bright:  "#EDD078",
          dim:     "#8A6E2A",
          subtle:  "rgba(201,168,76,0.08)",
          glow:    "rgba(201,168,76,0.22)",
        },
        // legacy compat
        gold: {
          DEFAULT: "#C9A84C",
          bright:  "#EDD078",
          dim:     "#8A6E2A",
          glow:    "rgba(201,168,76,0.22)",
          subtle:  "rgba(201,168,76,0.08)",
        },
        crimson: {
          DEFAULT: "#C41E3A",
          bright:  "#E8274D",
          dim:     "#7A1225",
          glow:    "rgba(196,30,58,0.3)",
          subtle:  "rgba(196,30,58,0.07)",
        },
        silver: {
          DEFAULT: "#A8A8B0",
          bright:  "#E0E0E8",
          dim:     "#606068",
          muted:   "#2A2A32",
        },
      },
      backgroundImage: {
        "champagne-gradient": "linear-gradient(135deg, #8A6E2A 0%, #C9A84C 45%, #EDD078 55%, #C9A84C 100%)",
        "gold-gradient":      "linear-gradient(135deg, #8A6E2A 0%, #C9A84C 45%, #EDD078 55%, #C9A84C 100%)",
        "crimson-gradient":   "linear-gradient(135deg, #7A1225 0%, #C41E3A 100%)",
        "card-surface":       "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
        "hero-glow":          "radial-gradient(ellipse 90% 60% at 50% -5%, rgba(201,168,76,0.14) 0%, transparent 65%)",
      },
      boxShadow: {
        "glass":        "0 0 0 1px rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.5)",
        "glass-hover":  "0 0 0 1px rgba(201,168,76,0.18), 0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(201,168,76,0.06)",
        "champagne":    "0 0 48px rgba(201,168,76,0.28), 0 4px 24px rgba(0,0,0,0.5)",
        "inner-light":  "inset 0 1px 0 rgba(255,255,255,0.07)",
        // legacy
        "gold-sm":      "0 0 12px rgba(201,168,76,0.2)",
        "gold-md":      "0 0 32px rgba(201,168,76,0.25), 0 4px 24px rgba(0,0,0,0.5)",
        "gold-lg":      "0 0 64px rgba(201,168,76,0.3), 0 8px 48px rgba(0,0,0,0.6)",
        "card":         "0 0 0 1px rgba(255,255,255,0.06), 0 24px 48px rgba(0,0,0,0.5)",
        "card-hover":   "0 0 0 1px rgba(201,168,76,0.18), 0 32px 64px rgba(0,0,0,0.6)",
        "inset-gold":   "inset 0 1px 0 rgba(201,168,76,0.12)",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.16, 1, 0.3, 1)",
        expo:   "cubic-bezier(0.19, 1, 0.22, 1)",
        cinematic: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn:  { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        shimmer: {
          "0%":   { backgroundPosition: "-400% 0" },
          "100%": { backgroundPosition: "400% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-10px)" },
        },
        goldPulse: {
          "0%, 100%": { opacity: "0.5" },
          "50%":      { opacity: "1" },
        },
        borderGlow: {
          "0%, 100%": { borderColor: "rgba(201,168,76,0.15)" },
          "50%":      { borderColor: "rgba(201,168,76,0.45)" },
        },
        filmScan: {
          "0%":   { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
      animation: {
        "fade-up":     "fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in":     "fadeIn 0.5s ease both",
        shimmer:       "shimmer 3s linear infinite",
        float:         "float 5s ease-in-out infinite",
        "gold-pulse":  "goldPulse 2.5s ease-in-out infinite",
        "border-glow": "borderGlow 2.5s ease-in-out infinite",
        "film-scan":   "filmScan 8s linear infinite",
      },
    },
  },
  plugins: [],
};
