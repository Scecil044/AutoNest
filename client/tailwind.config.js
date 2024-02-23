/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        appDark: "rgb(16, 23,42)",
      },
    },
  },
  plugins: [],
};
