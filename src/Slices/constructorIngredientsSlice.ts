import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { useId } from 'react';

type TIngredientsState = {
  addedIngredients: TConstructorIngredient[];
  bun: {
    _id: string;
    bunDetails: TConstructorIngredient | null;
  };
};

const initialState: TIngredientsState = {
  addedIngredients: [],
  bun: {
    _id: '',
    bunDetails: null
  }
};

export const constructorIngredientsSlice = createSlice({
  name: 'constructorIngredients',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun._id = action.payload._id;
          state.bun.bunDetails = action.payload;
        } else {
          state.addedIngredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient: (state, action) => {
      state.addedIngredients = state.addedIngredients.filter(
        (item) => item.id !== action.payload.id
      );
    },
    moveUpIngredient: (state, action) => {
      const indexOfObjToMove = state.addedIngredients.findIndex(
        (item) => item.id === action.payload.id
      );
      const indexOfObjToMoveWith = indexOfObjToMove - 1;
      const swapElements = (
        arr: TConstructorIngredient[],
        index1: number,
        index2: number
      ) => {
        [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
      };
      swapElements(
        state.addedIngredients,
        indexOfObjToMoveWith,
        indexOfObjToMove
      );
    },
    moveDownIngredient: (state, action) => {
      const indexOfObjToMove = state.addedIngredients.findIndex(
        (item) => item.id === action.payload.id
      );
      const indexOfObjToMoveWith = indexOfObjToMove + 1;
      const swapElements = (
        arr: TConstructorIngredient[],
        index1: number,
        index2: number
      ) => {
        [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
      };
      swapElements(
        state.addedIngredients,
        indexOfObjToMove,
        indexOfObjToMoveWith
      );
    },
    clearConstructor: (state) => {
      state.addedIngredients = [];
      state.bun._id = '';
      state.bun.bunDetails = null;
    }
  },
  selectors: {
    selectAddedIngredients: (state) => state.addedIngredients,
    selectAddedBunId: (state) => state.bun._id,
    selectAddedBunDetails: (state) => state.bun.bunDetails
  }
});

export const {
  selectAddedIngredients,
  selectAddedBunId,
  selectAddedBunDetails
} = constructorIngredientsSlice.selectors;
export const constructorIngredientsReducer =
  constructorIngredientsSlice.reducer;
export const {
  addIngredient,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient,
  clearConstructor
} = constructorIngredientsSlice.actions;
