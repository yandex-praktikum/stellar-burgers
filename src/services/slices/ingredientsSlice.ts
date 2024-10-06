import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export const getIngredient = createAsyncThunk<TIngredient[], void>(
  'ingredients/getIngredient',
  async (): Promise<TIngredient[]> => await getIngredientsApi()
);

type TIngredientsState = {
  isLoading: boolean;
  error: null | string;
  data: TIngredient[];
};
const initialState: TIngredientsState = {
  isLoading: true,
  error: null,
  data: []
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredient.pending, (state: any, action: any) => {})
      .addCase(getIngredient.fulfilled, (state: any, action: any) => {
        state.data = action.payload;
      });
  }
});

export const {} = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
