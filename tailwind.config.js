module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			screens: {
				smaller: "420px",
			},
			fontFamily: {
				"m-light": ["Montserrat-Light", "sans-serif"],
				"m-regular": ["Montserrat-Regular", "sans-serif"],
				"m-semiBold": ["Montserrat-SemiBold", "sans-serif"],
				"m-extraBold": ["Montserrat-ExtraBold", "sans-serif"],
			},
		},
	},
	plugins: [],
};
