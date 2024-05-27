import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '../utils/types';
import { getIngredientsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface IngredientsState {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | undefined;
}

const initialState: IngredientsState = {
  ingredients: [],
  loading: false,
  error: undefined
};

export const getIngredients = createAsyncThunk('getIngredients', async () => {
  const ingredients = await getIngredientsApi();
  localStorage.setItem('ingredients', JSON.stringify(ingredients));
  return ingredients;
});

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default ingredientsSlice.reducer;
