const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		screens: {
			xs: '480px',
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
		},
		fontFamily: {
			// Headings
			sans: ['Tenor Sans', 'regular'],
			// Base text
			monospace: ['JetBrains Mono', 'monospace'],
		},
		fontSize: {
			xs: '.75rem',
			sm: '.875rem',
			tiny: '.875rem',
			base: '1rem',
			lg: '1.125rem',
			xl: '1.25rem',
			'2xl': '1.5rem',
			'3xl': '1.875rem',
			'4xl': '2.25rem',
			'5xl': '3rem',
			'7xl': '5.5rem',
			'8xl': '7rem',
		},
		letterSpacing: {
			wide: '.025em',
		},
		extend: {
				
			colors: {
				black: '#0A0A0B',
				white: '#fff',
				orange: '#7977F1',
				glow: '#29276b',
				purple: '#1F1E47',
			},
			backgroundImage: {
			  'circle': 'radial-gradient(var(--tw-gradient-stops)) from-purple to-58%',
			  'radial-gradient2': 'radial-gradient(var(--tw-gradient-stops)) from-black to-18%',
			},
			typography: {
				DEFAULT: {
				  css: {
					'blockquote p:first-of-type::before': false,
					'blockquote p:first-of-type::after': false,
				  },
				},
			  },

		  },
	},
	plugins: [
		plugin(function ({ addBase, theme }) {
			addBase({
				h2: {
					letterSpacing: theme('letterSpacing.wide'),
				},
				li: {
					letterSpacing: theme('letterSpacing.wide'),
				},
			});
		}),
		require('@tailwindcss/typography'),
	],
};
