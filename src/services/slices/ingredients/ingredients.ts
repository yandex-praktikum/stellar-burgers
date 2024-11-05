import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '../../../utils/types';
import { getIngredientsApi } from '../../../utils/burger-api';

type TIngredientsState = {
  ingredientData: TIngredient | null;
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
};

export const initialState: TIngredientsState = {
  ingredientData: null,
  ingredients: [],
  loading: false,
  error: null
};

export const fetchIngredients = createAsyncThunk(
  '/ingredients/fetchIngredients',
  getIngredientsApi
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    showIngredientDetails: (state, action: PayloadAction<TIngredient>) => {
      state.ingredientData = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // При запросе
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // При успешном запросе
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })

      // При неуспешном запросе
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки';
      });
  }
});

export const { showIngredientDetails } = ingredientsSlice.actions;

export const getIngredientsLoading = (state: {
  ingredients: TIngredientsState;
}) => state.ingredients.loading;
export const getIngredients = (state: { ingredients: TIngredientsState }) =>
  state.ingredients.ingredients;
export const getIngredientDetails = (state: {
  ingredients: TIngredientsState;
}) => state.ingredients.ingredientData;

const ingredientReducer = ingredientsSlice.reducer;
export default ingredientReducer;
