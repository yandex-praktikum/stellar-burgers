import {
  createSlice,
  createAsyncThunk,
  SerializedError
} from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

interface IIngredientsState {
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
  isLoading: boolean;
  error: null | SerializedError;
}

const initialState: IIngredientsState = {
  buns: [],
  mains: [],
  sauces: [],
  isLoading: true,
  error: null
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
        state.buns = action.payload;
        state.mains = action.payload;
        state.sauces = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  }
});

// Селекторы
export const selectBuns = (state: { ingredients: IIngredientsState }) =>
  state.ingredients.buns;
export const selectMains = (state: { ingredients: IIngredientsState }) =>
  state.ingredients.mains;
export const selectSauces = (state: { ingredients: IIngredientsState }) =>
  state.ingredients.sauces;

// Экспортирую редьюсер
export default ingredientsSlice.reducer;
