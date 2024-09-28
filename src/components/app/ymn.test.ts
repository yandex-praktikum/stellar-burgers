import { expect, test } from '@jest/globals';
import { ymn } from './ymn';

test('умножение положительных чисел', () => {
  const result = ymn(2, 4);
  expect(result).toBe(8);
});
