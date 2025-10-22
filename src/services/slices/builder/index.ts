import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  TConstructorIngredient,
  TConstructorState,
  TIngredient
} from '@utils-types';
import { v4 } from 'uuid';

export const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

const slice = createSlice({
  name: 'builder',
  initialState,
  reducers: {
    setBun(state, action: PayloadAction<TIngredient | null>) {
      state.bun = action.payload;
    },
    addIngredient: {
      prepare: (payload: TIngredient) => ({
        payload: { ...payload, id: v4() }
      }),
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        const { type } = action.payload;
        if (type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      }
    },
    removeIngredient(state, action: PayloadAction<string>) {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    moveIngredient(
      state,
      action: PayloadAction<{ index: number; upwards: boolean }>
    ) {
      const { index, upwards } = action.payload;
      const targetIndex = upwards ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex >= state.ingredients.length) {
        return;
      }

      [state.ingredients[index], state.ingredients[targetIndex]] = [
        state.ingredients[targetIndex],
        state.ingredients[index]
      ];
    },
    resetConstructor(state) {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    selectBuilderBun: (state) => state.bun,
    selectBuilderIngredients: (state) => state.ingredients
  }
});

export const {
  setBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  resetConstructor
} = slice.actions;

export default slice.reducer;

export const { selectBuilderBun, selectBuilderIngredients } = slice.selectors;
