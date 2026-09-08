import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.test.ts'],
  moduleNameMapper: {
    '^@api$': '<rootDir>/src/utils/burger-api',
    '^@api/(.*)$': '<rootDir>/src/utils/burger-api/$1',
    '^@slices$': '<rootDir>/src/services/slices',
    '^@slices/(.*)$': '<rootDir>/src/services/slices/$1',
    '^@selectors$': '<rootDir>/src/services/selectors',
    '^@selectors/(.*)$': '<rootDir>/src/services/selectors/$1',
    '^@utils-types$': '<rootDir>/src/utils/types',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components$': '<rootDir>/src/components',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@contexts$': '<rootDir>/src/contexts',
    '^@contexts/(.*)$': '<rootDir>/src/contexts/$1',
    '^@hocs$': '<rootDir>/src/hocs',
    '^@hocs/(.*)$': '<rootDir>/src/hocs/$1',
    '^@hooks$': '<rootDir>/src/hooks',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@pages$': '<rootDir>/src/pages',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@services$': '<rootDir>/src/services',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@utils$': '<rootDir>/src/utils',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@ui$': '<rootDir>/src/components/ui',
    '^@ui/(.*)$': '<rootDir>/src/components/ui/$1',
    '^@ui-pages$': '<rootDir>/src/components/ui/pages',
    '^@ui-pages/(.*)$': '<rootDir>/src/components/ui/pages/$1',
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: 'tsconfig.test.json',
      diagnostics: false,
    }],
  },
};

export default config;
