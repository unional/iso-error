module.exports = [
	{
		path: './cjs/index.js',
		limit: '55 kB'
	},
	{
		path: './tslib/index.js',
		limit: '55 kB'
	},
	{
		path: './esm/index.js',
		import: '*',
		limit: '10 kB'
	}
]
