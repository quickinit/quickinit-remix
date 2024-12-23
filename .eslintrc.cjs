module.exports = {
	root: true,
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	env: {
		browser: true,
		commonjs: true,
		es6: true,
	},
	ignorePatterns: ['!**/.server', '!**/.client'],

	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:react-hooks/recommended',
		'plugin:jsx-a11y/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:import/recommended',
		'plugin:import/typescript',
		'prettier',
	],

	plugins: ['react', 'jsx-a11y', '@typescript-eslint', 'import', 'prettier'],

	overrides: [
		{
			files: ['app/components/ui/*.tsx'],
			rules: {
				'react/prop-types': 'off',
			},
		},
		{
			files: ['**/*.{ts,tsx,js,jsx}'],
			settings: {
				react: {
					version: 'detect',
				},
				formComponents: ['Form'],
				linkComponents: [
					{ name: 'Link', linkAttribute: 'to' },
					{ name: 'NavLink', linkAttribute: 'to' },
				],
				'import/resolver': {
					typescript: {},
				},
			},
		},
		{
			files: ['.eslintrc.cjs'],
			env: {
				node: true,
			},
		},
	],
	rules: {
		'prettier/prettier': 'warn',
	},
};
