module.exports = {
  collectCoverageFrom: [
    '<rootDir>/ts/**/*.[jt]s'
  ],
  projects: [
    'packages/*',
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
