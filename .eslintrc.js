module.exports = {
	extends: [
		'react-app',
		'react-app/jest',
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
	],
	rules: {
		'@typescript-eslint/no-explicit-any': 'error',
	},
}
