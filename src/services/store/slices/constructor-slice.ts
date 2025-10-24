import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IConstructorState, TConstructorIngredient } from '@utils-types';
import { get } from 'http';
import { RootState } from '../store';

// Переменные для строковых наименований
const constructorSliceName = 'constructor';

// Начальное состояние
const initialState: IConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  }
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
    }
  }
});

// Селекторы
export const selectConstructorItems = (state: RootState) =>
  state.burgerConstructorState.constructorItems;

export const {
  setBun,
  setIngredient,
  removeIngredient,
  moveIngredient,
  resetConstructor
} = constructorSlice.actions;

export default constructorSlice.reducer;
