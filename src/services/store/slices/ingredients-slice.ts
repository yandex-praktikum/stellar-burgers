import { getIngredientsApi, handleApiError } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IIngredientsState, TIngredient } from '@utils-types';

// Переменные для строковых наименований
const fetchIngredientsActionType = 'ingredients/fetchIngredients';
const ingredientsSliceName = 'ingredients';

// Начальное состояние
const initialState: IIngredientsState = {
  ingredients: [],
  selectedIngredient: null,
  loading: false,
  error: null
};

// Загрузка ингредиентов
export const fetchIngredients = createAsyncThunk(
  fetchIngredientsActionType,
  async (_, { rejectWithValue }) => {
    try {
      return await getIngredientsApi();
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, 'Failed to load ingredients')
      );
    }
  }
);

// Слайс для ингредиентов
const ingredientSlice = createSlice({
  name: ingredientsSliceName,
  initialState,
  reducers: {},
  selectors: {
    getIngredients: (state) => state.ingredients
  },
  // Обработка асинхронных действий
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.ingredients = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});
export const { getIngredients } = ingredientSlice.selectors;
export default ingredientSlice.reducer;
