import { createSlice } from '@reduxjs/toolkit';
import { getIngredients } from './actions';
import { TIngredient } from '@utils-types';

interface IngredientsState {
  data: TIngredient[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IngredientsState = {
  data: [],
  isLoading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'ошибка загрузки';
      });
  }
});
export const selectData = (state: { ingredients: IngredientsState }) =>
  state.ingredients.data;
export const selectIsLoading = (state: { ingredients: IngredientsState }) =>
  state.ingredients.isLoading;
export const selectError = (state: { ingredients: IngredientsState }) =>
  state.ingredients.error;
