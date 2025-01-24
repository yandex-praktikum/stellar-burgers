import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

interface IBuilderState {
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
}

const initialState: IBuilderState = {
  constructorItems: {
    bun: null,
    ingredients: []
  }
};

const builderSlice = createSlice({
  name: 'builder',
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
    addMoveBunConstructor(state, action: PayloadAction<TIngredient>) {
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
export const selectConstructorItems = (state: { builder: IBuilderState }) =>
  state.builder.constructorItems;

export const selectBun = (state: { builder: IBuilderState }) =>
  state.builder.constructorItems.bun;

export const selectConstructorTotalCount = (state: {
  builder: IBuilderState;
}) => state.builder.constructorItems.ingredients.length;

// Экспортирую экшены
export const {
  addItemConstructor,
  deleteItemConstructor,
  addUpdateMoveConstructor,
  addMoveBunConstructor,
  clearConstructor
} = builderSlice.actions;

// Экспортирую редьюсер
export default builderSlice.reducer;
