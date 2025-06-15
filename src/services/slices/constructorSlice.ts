import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

export type constructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: constructorState = {
  bun: null,
  ingredients: []
};

type movingPosition = 1 | -1;

const changeElementIndex = (
  array: TConstructorIngredient[],
  element: TConstructorIngredient,
  movePosition: movingPosition
): TConstructorIngredient[] => {
  const newArray = [...array];
  const currentElementIndex = array.findIndex(
    (ingredient) => ingredient.id === element.id
  );
  const temp = element;
  array[currentElementIndex] = array[currentElementIndex + movePosition];
  array[currentElementIndex + movePosition] = temp;

  return newArray;
};

const constructorSlice = createSlice({
  name: 'constructorSlice',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push(action.payload);
      }
    },
    deleteIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload.id
      );
    },
    clearConstructorData: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
    moveIngredientDown: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      changeElementIndex(state.ingredients, action.payload, 1);
    },
    moveIngredientUp: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      changeElementIndex(state.ingredients, action.payload, -1);
    }
  }
});

export const {
  addIngredient,
  deleteIngredient,
  clearConstructorData,
  moveIngredientDown,
  moveIngredientUp
} = constructorSlice.actions;

export default constructorSlice;
