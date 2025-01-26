import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '../utils/types';
import { getIngredientsApi } from '@api';

interface IIngredientState {
  data: TIngredient[];
  isLoading: boolean;
  error: string | null | undefined;
}

const initialState: IIngredientState = {
  data: [],
  isLoading: true,
  error: null
};

export const fetchIngredients = createAsyncThunk(
  'ingredient/fetchIngredients',
  async () => {
    const ingredients = await getIngredientsApi();
    return ingredients;
  }
);

const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.rejected, (state, payload) => {
        state.error = payload.error.message;
        state.isLoading = false;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      });
  },
  selectors: {
    selectIngredients: (sliceState: IIngredientState) => sliceState.data,
    selectIsLoading: (sliceState) => sliceState.isLoading
  }
});

export const { selectIngredients, selectIsLoading } = ingredientSlice.selectors;
export default ingredientSlice.reducer;
