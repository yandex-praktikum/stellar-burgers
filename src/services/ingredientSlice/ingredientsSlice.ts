import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '../../utils/types';
import { getIngredientsApi } from '../../utils/burger-api';

export const getAllIngredients = createAsyncThunk(
  'ingredientData/getAllIngredients',
  async () => await getIngredientsApi()
);

interface TIngredientsState {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
}

export const initialState: TIngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};

export const ingredientSlice = createSlice({
  name: 'ingredientData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllIngredients.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllIngredients.fulfilled, (state, action) => {
        state.ingredients = [...action.payload];
        state.loading = false;
        state.error = null;
      })
      .addCase(getAllIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || 'Не удалось загрузить ингредиенты';
      });
  }
});

export default ingredientSlice.reducer;
