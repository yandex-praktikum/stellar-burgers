import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  // Использование пресета часто упрощает настройку ts-jest
  preset: 'ts-jest',

  // Движок V8 для быстрого сбора покрытия
  coverageProvider: 'v8',

  // Включаем сбор покрытия (из вашего второго примера)
  collectCoverage: true,

  // Папка для отчетов
  coverageDirectory: 'coverage',

  // Настройка трансформации файлов
  transform: {
    // Обработка .ts и .tsx файлов с помощью ts-jest
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        // Здесь можно указать путь к tsconfig, если он нестандартный
        // tsconfig: 'tsconfig.test.json',
      },
    ],
  },

  // Расширения файлов, которые Jest будет искать
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // Настройка путей для тестов (по умолчанию ищет в __tests__ или файлы .test/.spec)
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)'
  ],
};

export default config;