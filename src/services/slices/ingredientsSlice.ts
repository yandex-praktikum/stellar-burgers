import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient } from '../../utils/types';
import {
  SerializedError,
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';

export type TIngredientsState = {
  isLoading: boolean;
  data: TIngredient[];
  error: null | SerializedError;
};

export const ingredientsInitialState: TIngredientsState = {
  isLoading: true,
  data: [],
  error: null
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetch',
  async () => await getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: ingredientsInitialState,
  reducers: {},
  selectors: {
    getIngredientsSelector: (state) => state.data,
    getLoadingIngredientsSelector: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  }
});

export default ingredientsSlice.reducer;

export const { getIngredientsSelector, getLoadingIngredientsSelector } =
  ingredientsSlice.selectors;
