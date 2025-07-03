import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '../../utils/types';

interface ConstructorState {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
  orderRequest: boolean;
  orderModalData: null | any; // Убедитесь, что структура данных соответствует
}

const initialState: ConstructorState = {
  bun: null,
  ingredients: [],
  orderRequest: false,
  orderModalData: null
};

export const constructorSlice = createSlice({
  name: 'constructorBurger',
  initialState,
  reducers: {
    addBun: (state, action: PayloadAction<TIngredient>) => {
      state.bun = action.payload;
    },
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.ingredients.push(action.payload);
    },

    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
      state.orderRequest = false;
      state.orderModalData = null;
    },

    moveIngredient: (
      state,
      action: PayloadAction<{ index: number; direction: 'up' | 'down' }>
    ) => {
      const { index, direction } = action.payload;

      // Проверяем, что индекс в пределах массива
      if (index < 0 || index >= state.ingredients.length) return;

      const newIndex = direction === 'up' ? index - 1 : index + 1;

      // Проверяем, что перемещение не выходит за пределы массива
      if (newIndex < 0 || newIndex >= state.ingredients.length) return;

      // Перемещаем элемент
      const itemToMove = state.ingredients[index];
      state.ingredients.splice(index, 1); // Удаляем элемент с текущего места
      state.ingredients.splice(newIndex, 0, itemToMove); // Вставляем на новое место
    },
    removeIngredientByIndex: (
      state,
      action: PayloadAction<{ index: number }>
    ) => {
      const { index } = action.payload;
      if (index < 0 || index >= state.ingredients.length) return;
      state.ingredients.splice(index, 1);
    }
  }
});

export const {
  addBun,
  addIngredient,
  removeIngredientByIndex,
  clearConstructor,
  moveIngredient
} = constructorSlice.actions;

export default constructorSlice.reducer;
