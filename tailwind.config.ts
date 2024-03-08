import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import { nextui } from "@nextui-org/react";
export default {
	content: [
		"./src/**/*.tsx",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			borderRadius: {
				"1/2": "50%",
			},
			width: {
				"1/7": "14.2857143%",
				"2/7": "28.5714286%",
				"3/7": "42.8571429%",
				"4/7": "57.1428571%",
				"5/7": "71.4285714%",
				"6/7": "85.7142857%",
				"2.5/6": "41.6666667%",
				"2.8/6": "46.6666667%",
			},

			screens: {
				smallphone: "320px",
				phone: "390px",
				smalltablet: "760px",
				tablet: "1020px",
			},
			colors: {
				primary: "#3c096ccc",
				secondary: "#353535",
				white: "#fff",
				black: "#000",
				background: "#FBECE8",
			},
			fontFamily: {
				// { fontFamily: "OpenSansBold" },
				OpenSansBold: "OpenSansBold",
				OpenSans: "OpenSans",
			},
			fontSize: {
				xs: "0.75rem",
				sm: "0.875rem",
				base: "1rem",
				"2xs": "0.6rem",
				"3xs": "0.5rem",
			},

			padding: {
				4.5: "1.125rem",
			},
		},
	},
	darkMode: "class",
	plugins: [nextui()],
} satisfies Config;

// /** @type {import('tailwindcss').Config} */
// module.exports = {
// 	content: [],
// 	theme: {
// 		extend: {
// 			borderRadius: {
// 				"1/2": "50%",
// 			},
// 			width: {
// 				"1/7": "14.2857143%",
// 				"2/7": "28.5714286%",
// 				"3/7": "42.8571429%",
// 				"4/7": "57.1428571%",
// 				"5/7": "71.4285714%",
// 				"6/7": "85.7142857%",
// 				"2.5/6": "41.6666667%",
// 				"2.8/6": "46.6666667%",
// 			},

// 			screens: {
// 				smallphone: "320px",
// 				phone: "390px",
// 				smalltablet: "760px",
// 				tablet: "1020px",
// 			},
// 			colors: {
// 				primary: "#3c096ccc",
// 				secondary: "#353535",
// 				white: "#fff",
// 				black: "#000",
// 				background: "#FBECE8",
// 			},
// 			fontFamily: {
// 				// { fontFamily: "OpenSansBold" },
// 				OpenSansBold: "OpenSansBold",
// 				OpenSans: "OpenSans",
// 			},
// 			fontSize: {
// 				xs: "0.75rem",
// 				sm: "0.875rem",
// 				base: "1rem",
// 				"2xs": "0.6rem",
// 				"3xs": "0.5rem",
// 			},

// 			padding: {
// 				4.5: "1.125rem",
// 			},
// 		},
// 	},
// 	plugins: [],
// };
