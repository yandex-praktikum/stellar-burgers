module.exports = {
  testEnvironment: 'jsdom',

  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest'
  },

  moduleNameMapper: {
    '\\.(css|scss)$': 'jest-css-modules-transform'
  },

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],

  testMatch: ['**/*.test.ts', '**/*.test.tsx'],

  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/tests/'
  ]
};
