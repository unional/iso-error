module.exports = {
	env: {
		es2021: true,
		node: true,
		es6: true,
		jest: true
	},
	parserOptions: {
		sourceType: 'module'
	},
	extends: ['plugin:harmony/latest'],
	overrides: [
		{
			extends: 'plugin:harmony/ts-prettier',
			files: ['*.ts', '*.tsx'],
			rules: {
				'no-use-before-define': 'off'
			}
		}
	]
}
