import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IConstructorState,
  TConstructorIngredient,
  TOrder
} from '@utils-types';

// Переменные для строковых наименований
const constructorSliceName = 'constructor';

// Начальное состояние
const initialState: IConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderData: null,
  error: null
};

// Слайс для конструктора
const constructorSlice = createSlice({
  name: constructorSliceName,
  initialState,
  reducers: {
    setBun: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.constructorItems.bun = action.payload;
    },
    setIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.constructorItems.ingredients.push(action.payload);
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredient) => ingredient.id !== action.payload
        );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ oldIndex: number; newIndex: number }>
    ) => {
      const { oldIndex, newIndex } = action.payload;
      const ingredients = state.constructorItems.ingredients;
      // Убедимся, что индексы в допустимых пределах
      if (newIndex >= 0 && newIndex < ingredients.length) {
        // Меняем местами элементы
        const [movedItem] = ingredients.splice(oldIndex, 1);
        ingredients.splice(newIndex, 0, movedItem);
      }
    },
    resetConstructor: (state) => {
      state.constructorItems.bun = null;
      state.constructorItems.ingredients = [];
    },
    setOrderRequest: (state, action: PayloadAction<boolean>) => {
      state.orderRequest = action.payload;
    },
    setOrderData: (state, action: PayloadAction<TOrder | null>) => {
      state.orderData = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    }
  }
});

export const { setBun, setIngredient, removeIngredient, moveIngredient } =
  constructorSlice.actions;

export default constructorSlice.reducer;
