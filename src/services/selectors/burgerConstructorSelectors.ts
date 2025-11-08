import { RootState } from '../store';
import { createSelector } from '@reduxjs/toolkit';

export const getConstructorBun = (state: RootState) =>
  state.burgerConstructor.bun;

export const getConstructorIngredients = (state: RootState) =>
  state.burgerConstructor.ingredients;

export const getConstructorItems = createSelector(
  [getConstructorBun, getConstructorIngredients],
  (bun, ingredients) => ({
    bun,
    ingredients
  })
);

// Селектор для подсчета количества каждого ингредиента
export const getIngredientCounts = createSelector(
  [getConstructorBun, getConstructorIngredients],
  (bun, ingredients) => {
    const counts: { [key: string]: number } = {};

    if (bun) {
      counts[bun._id] = 2; // Булка учитывается дважды (верх и низ)
    }

    ingredients.forEach((ingredient) => {
      counts[ingredient._id] = (counts[ingredient._id] || 0) + 1;
    });

    return counts;
  }
);
