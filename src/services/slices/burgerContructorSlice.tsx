import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '../../utils/types';
import { nanoid } from '@reduxjs/toolkit';

type TBurgerConstructorSlice = {
  bun: TConstructorIngredient | TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TBurgerConstructorSlice = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    deleteIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id === action.payload
      );
    },
    emptyConstructor: (state) => {
      state = initialState;
    }
  },
  selectors: {
    selectConstructorItem: (state) => state
  }
});

export const { addIngredient, deleteIngredient, emptyConstructor } =
  burgerConstructorSlice.actions;
export const { selectConstructorItem } = burgerConstructorSlice.selectors;
