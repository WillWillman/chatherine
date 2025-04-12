import tseslint from 'typescript-eslint';

export default tseslint.config(
	{ ignores: ['**/dist/**', 'cli.js', 'extension.js'] },
	{ files: ['**/*.{js,ts}'] },
	...tseslint.configs.recommended,
	{
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_',
					ignoreRestSiblings: true,
					args: 'after-used',
				},
			],
		},
	},
);
