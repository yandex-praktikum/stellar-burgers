import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

interface IIngredientsState {
  getIngredientRequest: boolean;
  getIngredientsError: boolean;
  errorMessage: string;
  ingredients: TIngredient[];
}

const initialState: IIngredientsState = {
  getIngredientRequest: false,
  getIngredientsError: false,
  errorMessage: '',
  ingredients: []
};

// Создание Thunk-функции для получения ингредиентов
export const fetchIngredients = createAsyncThunk<
  TIngredient[],
  void,
  { rejectValue: string }
>('ingredients/fetchIngredients', async (_, { rejectWithValue }) => {
  try {
    const ingredients = await getIngredientsApi();
    return ingredients;
  } catch (error) {
    return rejectWithValue(
      (error as { message?: string }).message || 'Ошибка получения ингредиентов'
    );
  }
});

// Создание слайса с ранее описанными редьюсерами
const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    getIngredientsRequest(state) {
      state.getIngredientRequest = true;
    },
    getIngredientsSuccess(state, action: PayloadAction<TIngredient[]>) {
      state.getIngredientRequest = false;
      state.getIngredientsError = false;
      state.ingredients = action.payload;
    },
    getIngredientsError(state, action: PayloadAction<string>) {
      state.getIngredientRequest = false;
      state.getIngredientsError = true;
      state.errorMessage = action.payload;
    }
  }
});

// Селекторы
export const selectIngredients = (state: { ingredients: IIngredientsState }) =>
  state.ingredients.ingredients;
export const selectGetIngredientRequest = (state: {
  ingredients: IIngredientsState;
}) => state.ingredients.getIngredientRequest;
export const selectGetIngredientsError = (state: {
  ingredients: IIngredientsState;
}) => state.ingredients.getIngredientsError;
export const selectErrorMessage = (state: { ingredients: IIngredientsState }) =>
  state.ingredients.errorMessage;

// Экспортирую экшены
export const {
  getIngredientsRequest,
  getIngredientsSuccess,
  getIngredientsError
} = ingredientsSlice.actions;

// Экспортирую редьюсер
export default ingredientsSlice.reducer;
