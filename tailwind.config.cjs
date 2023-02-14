const { success } = require('daisyui/src/colors');

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},
	daisyui: {
		themes: [
			{
				light: {
					...require('daisyui/src/colors/themes')['[data-theme=light]'],
					primary: '#004E73',
					error: '#B90F22',
					success: '#7FAB16'
				}
			},
			{
				dark: {
					...require('daisyui/src/colors/themes')['[data-theme=dark]'],
					primary: '#0083CC',
					error: '#B90F22',
					success: '#7FAB16'
				}
			},
			'night'
		]
	},

	plugins: [require('daisyui')]
};

module.exports = config;
