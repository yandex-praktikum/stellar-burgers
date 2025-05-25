import type {Config} from 'jest';

const config: Config = {
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  preset: 'ts-jest',
  moduleNameMapper: { 
    "^@pages(.*)$": "<rootDir>/src/pages$1",
    "^@components(.*)$": "<rootDir>/src/components$1",
    "^@ui(.*)$": "<rootDir>/src/components/ui$1",
    "^@ui-pages(.*)$": "<rootDir>/src/components/ui/pages$1",
    "^@utils-types(.*)$": "<rootDir>/src/utils/types$1",
    "^@api$": "<rootDir>/src/utils/burger-api.ts",
    "^@slices(.*)$": "<rootDir>/src/services/slices$1",
    "^@selectors(.*)$": "<rootDir>/src/services/selectors$1",
    "^@app-store(.*)$": "<rootDir>/src/services/store$1",
    "^@cookie(.*)$": "<rootDir>/src/utils/cookie$1"
  }
};

export default config;
