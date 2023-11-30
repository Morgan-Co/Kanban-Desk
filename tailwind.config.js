/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		colors: {
			blue: '#0079BF',
			gray: '#EBECF0',
			white: '#FFFFFF',
			transparent: "transparent",
			'water-blue': '#0067A3',
			'dark-gray': '#CBCBCB',
		},
		extend: {
      fontFamily: {
        roboto: "Roboto"
      }
    },
	},
	plugins: [],
}
