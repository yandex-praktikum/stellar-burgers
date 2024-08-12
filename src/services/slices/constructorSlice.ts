import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '../../utils/types';

type TBurgerConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TBurgerConstructorState = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'constructorBurger',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        switch (action.payload.type) {
          case 'bun':
            state.bun = action.payload;
            break;
          case 'main':
          case 'sauce':
            state.ingredients.push(action.payload);
        }
        return state;
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    deleteIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ id: string; direction: string }>
    ) => {
      const { direction, id } = action.payload;

      const index = state.ingredients.findIndex((idx) => idx.id === id);

      const ingredients = state.ingredients;
      const ingredientMove = ingredients[index];

      if (direction === 'up') {
        ingredients[index] = ingredients[index - 1];
        ingredients[index - 1] = ingredientMove;
      } else {
        ingredients[index] = ingredients[index + 1];
        ingredients[index + 1] = ingredientMove;
      }
    },
    resetConstructor: (state: TBurgerConstructorState) => (state = initialState)
  },
  selectors: {
    getConstructorState: (state) => state,
    getBurgerPrice: (state) => {
      if (!state.bun) {
        return 0;
      }
      const bunPrice = state.bun.price * 2;
      const ingredientPrice = state.ingredients?.reduce(
        (sum: number, ingredient: TConstructorIngredient) =>
          sum + ingredient.price,
        0
      );
      return bunPrice + ingredientPrice;
    }
  }
});

export const constructorReducer = constructorSlice.reducer;
export const { getConstructorState, getBurgerPrice } =
  constructorSlice.selectors;
export const {
  addIngredient,
  deleteIngredient,
  moveIngredient,
  resetConstructor
} = constructorSlice.actions;
