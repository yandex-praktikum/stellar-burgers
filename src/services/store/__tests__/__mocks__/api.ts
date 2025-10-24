/* eslint-disable */
export const getIngredientsApi = jest.fn();
export const handleApiError = jest.fn();

if (process.env.NODE_ENV === 'test') {
  // Это мок файл, тесты не нужны
} 