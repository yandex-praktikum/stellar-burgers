import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient } from '../../utils/types';

//TIngredientsSlice описывает структуру состояния слайса, который включает массив ингредиентов, флаг загрузки и сообщение об ошибке.
type TIngredientsSlice = {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
};
// Инициализируем состояние
export const initialState: TIngredientsSlice = {
  ingredients: [],
  isLoading: false,
  error: null
};
// Создаем санку для получения ингредиентов
export const getIngredients = createAsyncThunk('ingredients/get', async () =>
  getIngredientsApi()
);
// Создаем слайс
export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isLoading = false;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      });
  },
  selectors: {
    selectBuns: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'bun'),
    selectSauces: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'sauce'),
    selectMains: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'main'),
    selectIngredients: (state) => state.ingredients,
    selectIsLoading: (state) => state.isLoading
  }
});

export const {
  selectBuns,
  selectIngredients,
  selectSauces,
  selectMains,
  selectIsLoading
} = ingredientsSlice.selectors;
export default ingredientsSlice.reducer;
