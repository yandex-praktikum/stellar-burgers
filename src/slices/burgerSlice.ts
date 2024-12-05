import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

interface IBurgerState {
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
}

const initialState: IBurgerState = {
  buns: [],
  mains: [],
  sauces: []
};

const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    setBuns(state, action: PayloadAction<TIngredient[]>) {
      state.buns = action.payload;
    },
    setMains(state, action: PayloadAction<TIngredient[]>) {
      state.mains = action.payload;
    },
    setSauces(state, action: PayloadAction<TIngredient[]>) {
      state.sauces = action.payload;
    }
  }
});

// определяю селекторы вне слайса
export const selectBuns = (state: { burger: IBurgerState }) =>
  state.burger.buns;
export const selectMains = (state: { burger: IBurgerState }) =>
  state.burger.mains;
export const selectSauces = (state: { burger: IBurgerState }) =>
  state.burger.sauces;

export const { setBuns, setMains, setSauces } = burgerSlice.actions;
export default burgerSlice.reducer;
