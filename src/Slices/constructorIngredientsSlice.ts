import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TIngredientsState = {
  addedIngredients: TConstructorIngredient[];
};

const initialState: TIngredientsState = {
  addedIngredients: []
};

export const constructorIngredientsSlice = createSlice({
  name: 'constructorIngredients',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      state.addedIngredients.push(action.payload);
      console.log('sssssssssssss');
    }
  },
  selectors: {
    selectAddedIngredients: (state) => state.addedIngredients
  }
});

export const { selectAddedIngredients } = constructorIngredientsSlice.selectors;
export const constructorIngredientsReducer =
  constructorIngredientsSlice.reducer;
export const { addIngredient } = constructorIngredientsSlice.actions;
