import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '../../utils/burger-api';

type TIngredientState = {
  ingredients: TIngredient[];
  isLoading: boolean;
  status: string;
};

const initialState: TIngredientState = {
  ingredients: [],
  isLoading: false,
  status: 'idle'
};

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async () => {
    const response = await getIngredientsApi();
    return response;
  }
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getIngredients.pending, (state) => {
      state.isLoading = true;
      state.status = 'pending';
    });
    builder.addCase(getIngredients.rejected, (state) => {
      state.isLoading = false;
      state.status = 'fail';
    });
    builder.addCase(getIngredients.fulfilled, (state, action) => {
      state.isLoading = false;
      state.ingredients = action.payload;
      state.status = 'success';
    });
  }
});

export default ingredientsSlice.reducer;
