const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
	 flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        'blue_1': '#002b6a',
        'blue_2': '#0048ff',
        'orange_1': '#e27303',
        'green_1': '#5dab2c',
      },
    },
  },
  plugins: [
	  flowbite.plugin(),
  ],
}

