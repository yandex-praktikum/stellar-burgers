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
export const { addIngredient, removeIngredient } =
  constructorIngredientsSlice.actions;
