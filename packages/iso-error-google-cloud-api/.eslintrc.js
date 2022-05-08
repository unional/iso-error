const path = require('node:path')
module.exports = {
  'env': {
    'es2021': true,
    'node': true,
    'es6': true,
    'jest': true
  },
  'extends': [
    'plugin:harmony/latest'
  ],
  'overrides': [
    {
      'extends': 'plugin:harmony/ts-recommended-type-check',
      'files': [
        '*.ts',
        '*.tsx'
      ],
      'parserOptions': {
        'project': path.resolve(__dirname, 'tsconfig.json')
      },
      'rules': {
        'no-use-before-define': 'off'
      }
    }
  ]
}
