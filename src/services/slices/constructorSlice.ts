import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};
export const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};
export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addBun(state, action: PayloadAction<TIngredient | null>) {
      state.bun = action.payload;
    },
    addIngredient(state, action) {
      const newPayload = { ...action.payload, id: +new Date() };
      state.ingredients.push(newPayload);
    },
    removeIngredient(state, action) {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload.id
      );
    },
    moveUpIngredient(state, action) {
      const tempIngredient = state.ingredients[action.payload];
      state.ingredients[action.payload] = state.ingredients[action.payload - 1];
      state.ingredients[action.payload - 1] = tempIngredient;
    },
    moveDownIngredient(state, action) {
      const tempIngredient = state.ingredients[action.payload];
      state.ingredients[action.payload] = state.ingredients[action.payload + 1];
      state.ingredients[action.payload + 1] = tempIngredient;
    },
    resetConstructor(state) {
      state.bun = null;
      state.ingredients = [];
    }
  }
});
export const {
  addBun,
  addIngredient,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient,
  resetConstructor
} = constructorSlice.actions;
export default constructorSlice.reducer;
