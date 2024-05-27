import { createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

interface InitialState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: InitialState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      if (action.payload.type === 'bun') {
        return {
          ...state,
          bun: action.payload
        };
      } else {
        return {
          ...state,
          ingredients: [...state.ingredients, action.payload]
        };
      }
    },
    removeIngredient: (state, action) => ({
      ...state,
      ingredients: state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload.id
      )
    }),
    moveIngredientUp: (state, action) => {
      const index = action.payload.index;
      const temp = state.ingredients[index];
      state.ingredients[index] = state.ingredients[index - 1];
      state.ingredients[index - 1] = temp;
    },
    moveIngredientDown: (state, action) => {
      const index = action.payload.index;
      const temp = state.ingredients[index];
      state.ingredients[index] = state.ingredients[index + 1];
      state.ingredients[index + 1] = temp;
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown
} = constructorSlice.actions;
export default constructorSlice.reducer;
