import {
  PayloadAction,
  createSelector,
  createSlice,
  nanoid
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export interface IConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: IConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        switch (action.payload.type) {
          case 'bun':
            state.bun = action.payload;
            break;
          default:
            state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredients: TIngredient) => ({
        payload: { ...ingredients, id: nanoid() }
      })
    },

    removeIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    //   moveIngredient: (state, action: PayloadAction<{ingredient: TIngredient, direction: string}>) => {
    //     const { ingredient, direction } = action.payload;
    //     const indexOfIngredient = state.ingredients.indexOf(action.payload.ingredient);
    //     if (direction === 'up' && indexOfIngredient === 0) {
    //       return state;
    //     }
    //     if (direction === 'down' && indexOfIngredient === state.ingredients.length - 1) {
    //       return state;
    //     }
    //     const swapIndex = direction === 'up' ? indexOfIngredient- 1 : indexOfIngredient + 1;

    //   [state.ingredients[indexOfIngredient], state.ingredients[swapIndex]] = [state.ingredients[swapIndex], state.ingredients[indexOfIngredient]];

    // return state;
    //   },
    clearIngredients: (state) => (state = initialState)
  },
  selectors: {
    getBurger: (state) => state,
    getIngredients: (state) => state.ingredients,
    getAllIngredients: createSelector(
      (state) => state,
      (state) => {
        const { bun, ingredients } = state;
        const bunArray = bun ? [bun] : [];
        return [...bunArray, ...ingredients];
      }
    )
  }
});

export const { getBurger, getIngredients, getAllIngredients } =
  constructorSlice.selectors;
export const { addIngredient, removeIngredient, clearIngredients } =
  constructorSlice.actions;

export default constructorSlice.reducer;
