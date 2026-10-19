import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getIngredientsApi } from '../../utils/burger-api';

import type { TIngredient } from '../../utils/types';

export const fetchIngredients = createAsyncThunk('ingredients/fetchAll', async () => {
  const data = await getIngredientsApi();
  // console.log(data)
  return data;
});

type TIngredientsState = {
  ingredients: TIngredient[];
  isIngredientsLoading: boolean;
  ingredientsError: string | null;
};

const initialState: TIngredientsState = {
  ingredients: [],
  isIngredientsLoading: false,
  ingredientsError: null,
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
        state.ingredientsError = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isIngredientsLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isIngredientsLoading = false;
        state.ingredientsError = action.error.message || 'Ошибка загрузки ингредиентов';
      });
  },
});

export default ingredientsSlice.reducer;
