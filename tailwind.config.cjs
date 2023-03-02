/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: "#F37950",
				secondary: "#17212f"
			}
		},
	},
	plugins: [require("daisyui")],
	daisyui: {
		themes: [
			{
				light: {
					...require("daisyui/src/colors/themes")["[data-theme=light]"],
					primary: "#F37950",
					secondary: "#17212f",
					// "primary-focus": "mediumblue",
				  },
			}
		],
		darkTheme: "light",

	},
}
