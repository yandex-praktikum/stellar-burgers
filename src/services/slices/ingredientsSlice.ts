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
      .addCase(getIngredient.pending, (state: any, action: any) => {
        console.log('reduser');
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredient.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(getIngredient.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.error = action.error;
      });
  }
});

export const {} = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
