import { createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '../../utils/types';

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
  reducers: {},
  selectors: {
    selectConstructorItem: (state) => state
  }
});

export const { selectConstructorItem } = burgerConstructorSlice.selectors;
