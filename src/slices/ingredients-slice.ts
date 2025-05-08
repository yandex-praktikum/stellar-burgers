import {
  createSlice,
  createAsyncThunk,
  SerializedError
} from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';
import { RootState } from '../services/store';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetch',
  async () => {
    const response = await getIngredientsApi();
    return response;
  }
);

export type IIngredientsState = {
  items: TIngredient[];
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
  isLoading: boolean;
  error: null | SerializedError;
};

const initialState: IIngredientsState = {
  items: [],
  buns: [],
  mains: [],
  sauces: [],
  isLoading: true,
  error: null
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.buns = action.payload.filter((item) => item.type === 'bun');
        state.mains = action.payload.filter((item) => item.type === 'main');
        state.sauces = action.payload.filter((item) => item.type === 'sauce');
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  }
});

export const selectIngredients = (state: RootState) => state.ingredients.items;
export const selectBuns = (state: RootState) => state.ingredients.buns;
export const selectMains = (state: RootState) => state.ingredients.mains;
export const selectSauces = (state: RootState) => state.ingredients.sauces;
export const selectIsLoading = (state: RootState) =>
  state.ingredients.isLoading;

export default ingredientsSlice.reducer;
