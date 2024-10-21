import { nanoid, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '@utils-types';
// Определяем интерфейс состояния конструктора бургера
interface IBurgerConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

// Начальное состояние конструктора бургера
export const initialState: IBurgerConstructorState = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  selectors: {
    getConstructorState: (state) => state
  },
  reducers: {
    // Редьюсеры для изменения состояния
    addIngredientToConstructor: {
      prepare: (item: TIngredient) => ({
        payload: { ...item, id: nanoid() }
      }),

      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      }
    },
    deleteIngredientFromConstructor: (state, action: PayloadAction<string>) => {
      const ingredientIndex = state.ingredients.findIndex(
        (ingredient) => ingredient.id === action.payload
      );

      if (ingredientIndex >= 0) {
        state.ingredients.splice(ingredientIndex, 1); // Удаляем элемент по индексу
      }
    },
    moveIngredientInConstructor: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = action.payload;

      if (from !== to) {
        const [movedIngredient] = state.ingredients.splice(from, 1); // Удаляем элемент из original массива
        state.ingredients.splice(to, 0, movedIngredient); // Вставляем его на новое место
      }
    },
    clearConstructor: (state) => {
      // Очистка конструктора
      state.ingredients = [];
      state.bun = null;
    }
  }
});

export const {
  addIngredientToConstructor,
  deleteIngredientFromConstructor,
  moveIngredientInConstructor,
  clearConstructor
} = burgerConstructorSlice.actions;

// Экспортируем селектор для получения состояния конструктора
export const { getConstructorState } = burgerConstructorSlice.selectors;
