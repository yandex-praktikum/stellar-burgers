module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@ui$': '<rootDir>/src/components/ui',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@slices$': '<rootDir>/src/services/store/slices',
    '^@api$': '<rootDir>/src/services/store/__tests__/__mocks__/api',
    '^@store$': '<rootDir>/src/services/store',
    '^@utils-types$': '<rootDir>/src/utils/types',
    '^@utils-cookie$': '<rootDir>/src/services/store/__tests__/__mocks__/cookie'
  },
  testPathIgnorePatterns: [
    '/__mocks__/'
  ]
} 