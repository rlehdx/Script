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
        display: ["Bebas Neue", "Arial Narrow", "sans-serif"],
        body:    ["IBM Plex Mono", "Courier New", "monospace"],
        serif:   ["IBM Plex Serif", "Georgia", "serif"],
        mono:    ["IBM Plex Mono", "Courier New", "monospace"],
        sans:    ["IBM Plex Mono", "Courier New", "monospace", "system-ui"],
      },
      colors: {
        obsidian: {
          DEFAULT: "#0A0A0F",
          50:  "#f4f4f6",
          100: "#e9e9ef",
          200: "#c8c8d9",
          300: "#a0a0bc",
          400: "#6b6b8f",
          500: "#4a4a6a",
          600: "#2e2e4a",
          700: "#1a1a2e",
          800: "#111120",
          900: "#0A0A0F",
          950: "#050508",
        },
        charcoal: {
          DEFAULT: "#141420",
          light:   "#1c1c2e",
          card:    "#12121e",
          border:  "rgba(255,255,255,0.07)",
        },
        gold: {
          DEFAULT: "#D4AF37",
          bright:  "#F5D060",
          dim:     "#8B7322",
          glow:    "rgba(212,175,55,0.3)",
          subtle:  "rgba(212,175,55,0.08)",
        },
        crimson: {
          DEFAULT: "#C41E3A",
          bright:  "#E8274D",
          dim:     "#7A1225",
          glow:    "rgba(196,30,58,0.35)",
          subtle:  "rgba(196,30,58,0.08)",
        },
        silver: {
          DEFAULT: "#C0C0C8",
          bright:  "#E8E8F0",
          dim:     "#6b6b7a",
          muted:   "#3a3a4a",
        },
      },
      backgroundImage: {
        "gold-gradient":      "linear-gradient(135deg, #D4AF37 0%, #F5D060 50%, #D4AF37 100%)",
        "gold-gradient-dim":  "linear-gradient(135deg, #8B7322 0%, #D4AF37 100%)",
        "crimson-gradient":   "linear-gradient(135deg, #C41E3A 0%, #E8274D 100%)",
        "obsidian-gradient":  "linear-gradient(180deg, #0A0A0F 0%, #141420 100%)",
        "card-sheen":         "linear-gradient(135deg, rgba(212,175,55,0.06) 0%, rgba(212,175,55,0.01) 100%)",
        "hero-radial":        "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(212,175,55,0.12) 0%, transparent 70%)",
        "gold-beam":          "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.15) 50%, transparent 100%)",
      },
      boxShadow: {
        "gold-sm":    "0 0 12px rgba(212,175,55,0.25)",
        "gold-md":    "0 0 32px rgba(212,175,55,0.3), 0 4px 24px rgba(0,0,0,0.5)",
        "gold-lg":    "0 0 64px rgba(212,175,55,0.35), 0 8px 48px rgba(0,0,0,0.6)",
        "card":       "0 1px 0 rgba(255,255,255,0.05) inset, 0 24px 48px rgba(0,0,0,0.5)",
        "card-hover": "0 1px 0 rgba(212,175,55,0.12) inset, 0 32px 64px rgba(0,0,0,0.6), 0 0 32px rgba(212,175,55,0.08)",
        "inset-gold": "inset 0 1px 0 rgba(212,175,55,0.15)",
      },
      transitionTimingFunction: {
        spring:    "cubic-bezier(0.16, 1, 0.3, 1)",
        cinematic: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        goldPulse: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%":      { opacity: "1",   transform: "scale(1.04)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-400% 0" },
          "100%": { backgroundPosition: "400% 0" },
        },
        filmScan: {
          "0%":   { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-8px)" },
        },
        borderGlow: {
          "0%, 100%": { borderColor: "rgba(212,175,55,0.2)" },
          "50%":      { borderColor: "rgba(212,175,55,0.6)" },
        },
      },
      animation: {
        "fade-up":    "fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in":    "fadeIn 0.6s ease both",
        "gold-pulse": "goldPulse 3s ease-in-out infinite",
        shimmer:      "shimmer 3s linear infinite",
        "film-scan":  "filmScan 8s linear infinite",
        "border-glow": "borderGlow 2s ease-in-out infinite",
        float:        "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
