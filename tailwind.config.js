

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    './node_modules/tailwind-datepicker-react/dist/**/*.js'
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-noti': '0px 8px 6px 0px #00000014',
      },
    },
  },
  plugins: [],
};
