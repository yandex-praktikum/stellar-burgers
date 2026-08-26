import type { SerializedError } from '@reduxjs/toolkit';
import type { TIngredient } from '@utils-types';

export type AppContentProps = {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: SerializedError | null;
};
