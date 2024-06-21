import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { RootState } from 'src/services/store';

type TIngredientsState = {
  ingredients: TIngredient[];
  isLoading: boolean;
};

const initialState: TIngredientsState = {
  ingredients: [],
  isLoading: true
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/getAll',
  async () => getIngredientsApi()
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectIngredientsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      });
  }
});

export const { selectIngredients, selectIngredientsLoading } =
  ingredientsSlice.selectors;

export const ingredientsReducer = ingredientsSlice.reducer;

export const getIngredients = (state: RootState) => state.ingredients;
