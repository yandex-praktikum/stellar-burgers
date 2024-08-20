import { getIngredientsApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export const getIngredients = createAsyncThunk(
  'ingredients/getAll',
  getIngredientsApi
);

export type TIngredientsState = {
  ingredients: TIngredient[];
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
  loading: boolean;
  error: string | null;
};

export const initialState: TIngredientsState = {
  ingredients: [],
  buns: [],
  mains: [],
  sauces: [],
  loading: true,
  error: null
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsSelector: (state) => state,
    getIngredientsState: (state) => state.ingredients,
    getIngredientsLoading: (state) => state.loading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ? action.error.message : null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        const ingredients = action.payload;
        state.loading = false;
        state.ingredients = ingredients;
        if (ingredients) {
          state.buns = ingredients.filter(
            (ingredient) => ingredient.type === 'bun'
          );
          state.mains = ingredients.filter(
            (ingredient) => ingredient.type === 'main'
          );
          state.sauces = ingredients.filter(
            (ingredient) => ingredient.type === 'sauce'
          );
        }
      });
  }
});

export const ingredientsReducer = ingredientsSlice.reducer;

export const {
  getIngredientsSelector,
  getIngredientsState,
  getIngredientsLoading
} = ingredientsSlice.selectors;
