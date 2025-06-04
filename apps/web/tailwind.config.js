/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./src/**/*.{js,ts,jsx,tsx}",

    ],
    theme: {
        extend: {
        colors: {
            primary: "#51A9f5",
            secondary: "#f55a5c",
            error: "#f43f5e",
        },
            fontFamily: {
        sans: ['"Plus Jakarta Sans"','Inter', 'sans-serif'],
        },
        },
    },
    plugins: [],
}
