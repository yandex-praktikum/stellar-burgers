import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

interface IConstructorState {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
}

const initialState: IConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  }
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addItemConstructor(state, action: PayloadAction<TConstructorIngredient>) {
      state.constructorItems.ingredients.push(action.payload);
    },
    deleteItemConstructor(
      state,
      action: PayloadAction<{ id: string; type: string }>
    ) {
      if (action.payload.type !== 'bun') {
        state.constructorItems.ingredients =
          state.constructorItems.ingredients.filter(
            (item) => item.id !== action.payload.id
          );
      }
    },
    addUpdateMoveConstructor(
      state,
      action: PayloadAction<TConstructorIngredient[]>
    ) {
      state.constructorItems.ingredients = action.payload;
    },
    addMoveBunConstructor(
      state,
      action: PayloadAction<TConstructorIngredient>
    ) {
      state.constructorItems.bun = action.payload;
    },
    clearConstructor(state) {
      state.constructorItems = {
        bun: null,
        ingredients: []
      };
    }
  }
});

// Определяю селекторы вне слайса
export const selectConstructorItems = (state: {
  constructor: IConstructorState;
}) => state.constructor.constructorItems;

export const selectBun = (state: { constructor: IConstructorState }) =>
  state.constructor.constructorItems.bun;

export const selectConstructorTotalCount = (state: {
  constructor: IConstructorState;
}) => state.constructor.constructorItems.ingredients.length;

// Экспортирую экшены
export const {
  addItemConstructor,
  deleteItemConstructor,
  addUpdateMoveConstructor,
  addMoveBunConstructor,
  clearConstructor
} = constructorSlice.actions;

// Экспортирую редьюсер
export default constructorSlice.reducer;
