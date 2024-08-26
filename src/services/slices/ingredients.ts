import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient } from '../../utils/types';

export const getIngredientsList = createAsyncThunk('ingredients', async () =>
  getIngredientsApi()
);

type TIngredientsState = {
  ingredients: Array<TIngredient>;
  loading: boolean;
  error: string | null | undefined;
};

const initialState: TIngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsLoadingState: (state) => state.loading,
    getIngredients: (state) => state.ingredients
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredientsList.rejected, (state, action) => {
        state.loading = false;
        state.ingredients = [];
        state.error = action.error?.message;
      })
      .addCase(getIngredientsList.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      });
  }
});

export const { getIngredientsLoadingState, getIngredients } =
  ingredientsSlice.selectors;

export const ingredientReducer = ingredientsSlice.reducer;
