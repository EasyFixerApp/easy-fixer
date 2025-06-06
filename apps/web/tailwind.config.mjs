/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#51A9f5",
        "primary-dark": "#3288D8",

        accent1: "#22D3EE",
        accent2: "#FACC15",
        accent3: "#E0F2FE",

        background: "#F8FAFB",
        card: "#FFFFFF",

        success: "#10B981",
        danger: "#F43F5E",

        secondary: "#f55a5c",
        error: "#f43f5e",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
