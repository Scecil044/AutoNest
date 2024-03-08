/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        appDark: "rgb(16, 23,42)",
        // First option
        darkGreen: "#2B3C1A",
        popsicle: "#E99A24", // dark orange
        blueberry: "#171516", // dark
        mango: "#FFEO83",
        linen: "#fdfaf5",
        pampas: "#e9e5df",
        darkBlue:"#003566"
      },
      fontFamily: {
        roboto: "roboto",
        lato: "lato",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
