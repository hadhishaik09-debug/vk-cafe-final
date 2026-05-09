/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      /* Luxury Typography */
      fontFamily: {
        display: ["Playfair Display", "serif"],
        serif: ["Cormorant Garamond", "serif"],
        sans: ["Inter", "sans-serif"],
      },

      /* VK Cafe Luxury Palette */
      colors: {
        champagne: "#C9A46A",
        cocoa: "#2B2B2B",
        cream: "#F8F4EF",
        latte: "#F2EDE7",
        ivory: "#FFFFFF",
      },

      /* Premium Shadows */
      boxShadow: {
        luxe:
          "0 30px 80px -40px rgba(0,0,0,0.18), 0 8px 24px -16px rgba(0,0,0,0.12)",

        glow:
          "0 0 80px -20px rgba(201,164,106,0.45)",
      },

      /* Cinematic Animations */
      animation: {
        "soft-rise":
          "soft-rise 1.4s cubic-bezier(0.22,1,0.36,1) forwards",

        "soft-in":
          "soft-in 1.6s ease-out forwards",

        "hero-zoom":
          "hero-zoom 12s ease-out forwards",

        "light-bloom":
          "light-bloom 2.4s cubic-bezier(0.22,1,0.36,1) forwards",

        "metallic-sweep":
          "metallic-sweep 3.5s cubic-bezier(0.4,0,0.2,1) forwards",

        float:
          "float-particle 7s ease-in-out infinite",

        glow:
          "glow-pulse 5s ease-in-out infinite",
      },

      /* Luxury Keyframes */
      keyframes: {
        "soft-rise": {
          "0%": {
            opacity: "0",
            transform: "translateY(28px)",
            filter: "blur(8px)",
          },

          "100%": {
            opacity: "1",
            transform: "translateY(0)",
            filter: "blur(0)",
          },
        },

        "soft-in": {
          "0%": {
            opacity: "0",
          },

          "100%": {
            opacity: "1",
          },
        },

        "hero-zoom": {
          "0%": {
            transform: "scale(1.06)",
          },

          "100%": {
            transform: "scale(1)",
          },
        },

        "light-bloom": {
          "0%": {
            opacity: "0",
            transform: "scale(1.04)",
            filter: "blur(20px)",
          },

          "100%": {
            opacity: "1",
            transform: "scale(1)",
            filter: "blur(0)",
          },
        },

        "metallic-sweep": {
          "0%": {
            backgroundPosition: "-150% 0",
          },

          "100%": {
            backgroundPosition: "250% 0",
          },
        },

        "float-particle": {
          "0%, 100%": {
            transform: "translate(0,0)",
            opacity: "0.5",
          },

          "50%": {
            transform: "translate(8px,-14px)",
            opacity: "0.9",
          },
        },

        "glow-pulse": {
          "0%, 100%": {
            opacity: "0.55",
          },

          "50%": {
            opacity: "0.85",
          },
        },
      },
    },
  },

  plugins: [],
}