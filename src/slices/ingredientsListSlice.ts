import {
  createSlice,
  createAsyncThunk,
  SerializedError
} from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

export interface IIngredientsState {
  isLoading: boolean;
  error: null | SerializedError;
  data: TIngredient[];
}

const initialState: IIngredientsState = {
  isLoading: true,
  error: null,
  data: []
};

// Создание Thunk-функции для получения ингредиентов
export const fetchIngredients = createAsyncThunk(
  'ingredients/fetch',
  async () => await getIngredientsApi()
);

// Создание слайса с ранее описанными редьюсерами
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
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  }
});

export const selectIngredients = (state: { ingredients: IIngredientsState }) =>
  state.ingredients.data;

export const selectIsLoading = (state: { ingredients: IIngredientsState }) =>
  state.ingredients.isLoading;

export default ingredientsSlice.reducer;
