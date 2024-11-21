/** @type {import('jest').Config} */
const config = {
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{ts,js}',
    '!**/node_modules/**',
    '!**/build/**',
    '!**/coverage/**',
  ],
  transform: {
    '\\.ts$': '<rootDir>/node_modules/ts-jest/preprocessor.js',
  },
  coverageReporters: ['text', 'text-summary'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts)x?$',
  testPathIgnorePatterns: ['/node_modules/', '/build/', '/coverage/'],
  //   rootDir: './',
  moduleNameMapper: {
    '@eslibr/(.*)': ['<rootDir>/src/$1'],
    '@eslibrRoot/(.*)': ['<rootDir>/$1'],
  },
}
// eslint-disable-next-line no-undef
module.exports = config
