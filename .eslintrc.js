module.exports = {
	extends: [
		'react-app',
		'react-app/jest',
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
	],
	rules: {
		'spaced-comment': ['error', 'always'],
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'error',
		'react/self-closing-comp': [
			'error',
			{
				component: true,
				html: true,
			},
		],
	},
}
