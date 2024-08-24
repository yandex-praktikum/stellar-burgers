import { getIngredientsApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TIngredientsSlice = {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
};

export const initialState: TIngredientsSlice = {
  ingredients: [],
  isLoading: false,
  error: null
};

export const getIngredients = createAsyncThunk('ingredients/get', async () =>
  getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      });
  },
  selectors: {
    selectBuns: (state: TIngredientsSlice) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'bun'),
    selectMains: (state: TIngredientsSlice) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'main'),
    selectSauces: (state: TIngredientsSlice) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'sauce')
  }
});

export const { selectBuns, selectMains, selectSauces } =
  ingredientsSlice.selectors;
export const ingredientsSliceReducer = ingredientsSlice.reducer;
