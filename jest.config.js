module.exports = {
  collectCoverageFrom: [
    '<rootDir>/ts/**/*.[jt]s'
  ],
  projects: [
    'packages/*',
    'packages/iso-error/jest.jsdom.mjs'
  ],
  watchPlugins: [
    'jest-watch-suspend',
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
    [
      'jest-watch-toggle-config', { 'setting': 'verbose' },
    ],
    [
      'jest-watch-toggle-config', { 'setting': 'collectCoverage' },
    ],
  ],
}
