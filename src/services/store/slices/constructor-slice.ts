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

export const { setBun, setIngredient } = constructorSlice.actions;

export default constructorSlice.reducer;
