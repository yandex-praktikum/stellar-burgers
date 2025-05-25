import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

interface IngredientsState {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
}

const initialState: IngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};

export const IngredientsThunk = createAsyncThunk(
  'ingredients/getAll',
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
    builder
      .addCase(IngredientsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(IngredientsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(IngredientsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Unknown error';
        console.error('IngredientsThunk rejected:', action.error?.message);
      });
  },
  selectors: {
    getIngredients: (state) => state.ingredients,
    ingredientsIsLoading: (state) => state.loading
  }
});

export const { getIngredients, ingredientsIsLoading } =
  ingredientsSlice.selectors;
export { initialState as initialStateIngredients };
