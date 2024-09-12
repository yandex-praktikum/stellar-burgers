import { nanoid, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '@utils-types';
// Определяем интерфейс состояния конструктора бургера
interface IBurgerConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

// Начальное состояние конструктора бургера
const initialState: IBurgerConstructorState = {
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
    deleteIngredientFromConstructor: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    moveIngredientInConstructor: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = action.payload;
      const ingredients = [...state.ingredients];
      const [movedIngredient] = ingredients.splice(from, 1);
      ingredients.splice(to, 0, movedIngredient);
      state.ingredients = ingredients;
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
