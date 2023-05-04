/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,ts}"],
    theme: {
        extend: {},
    },
    safelist: ["bg-blue-400", "bg-red-400", "bg-green-400"],
    plugins: [],
    purge: ["./src/**/*.html", "./src/**/*.ts"],
};
