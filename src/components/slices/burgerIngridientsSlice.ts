import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

interface IBurgerIngredients {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
}

export const initialState: IBurgerIngredients = {
  ingredients: [],
  isLoading: false,
  error: null
};

export const getBurgerIngridients = createAsyncThunk(
  'ingredients/get',
  async () => getIngredientsApi()
);

export const burgerIngredientsSlice = createSlice({
  name: 'burgerIngredients',
  initialState,
  reducers: {},
  selectors: {
    selectIsLoading: (state) => state.isLoading,
    selectIngredients: (state) => state.ingredients,
    selectBun: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'bun'),
    selectMain: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'main'),
    selectSauce: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'sauce')
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBurgerIngridients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBurgerIngridients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = 'ingredients error';
      })
      .addCase(getBurgerIngridients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      });
  }
});

export const {
  selectIsLoading,
  selectIngredients,
  selectBun,
  selectMain,
  selectSauce
} = burgerIngredientsSlice.selectors;
