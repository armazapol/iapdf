/** @type {import('tailwindcss').Config} */
import forms from "@tailwindcss/forms";
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js, jsx, ts, tsx, mdx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      boxShadow: {
        "custom-noti": "0px 8px 6px 0px #00000014",
      },
    },
  },
  plugins: [forms],
};
