/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: "class",

	theme: {
		extend: {
		  colors: {
			't-indigo': '#5236DD',
			't-ciel': '#99B4FF',
			't-orange': '#FFA76C',
			't-black': '#1F1F23',
			't-light-blue': '#f5f7ff',
			't-medium-blue': '#DBE1FF',
			't-dark-gray': '#343438'
		  },
		},
	  },

	plugins: []
};

module.exports = config;
