import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Leather Path - Buchón Elegante
        'leather-black': '#0B0B0C',
        'charcoal': '#1E1A17',
        'espresso': '#3E2C21',
        'saddle': '#7A5C3E',
        'camel': '#D0B08C',
        'ivory': '#F4EDE2',
        'gold': '#D4AF37', // Accent oro sutil
      },
      fontFamily: {
        'display': ['Cinzel', 'serif'], // Títulos principales
        'heading': ['Playfair Display', 'serif'], // Subtítulos
        'body': ['Inter', 'sans-serif'], // Texto del cuerpo
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'leather': '0 4px 6px -1px rgba(11, 11, 12, 0.1), 0 2px 4px -1px rgba(11, 11, 12, 0.06)',
        'leather-lg': '0 10px 15px -3px rgba(11, 11, 12, 0.1), 0 4px 6px -2px rgba(11, 11, 12, 0.05)',
      },
    },
  },
  plugins: [],
};

export default config;
