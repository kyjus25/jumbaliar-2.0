/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
		extend: {
			colors: {
				primary: "#F37950",
				secondary: "#17212f"
			}
		},
	},
  plugins: [],
}
