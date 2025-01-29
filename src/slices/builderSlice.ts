import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

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
    addBunBuilder(state, action: PayloadAction<TIngredient | null>) {
      state.constructorItems.bun = action.payload;
    },
    addItemBuilder: {
      prepare: (payload: TConstructorIngredient) => ({
        payload: { ...payload, id: uuidv4() }
      }),
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      }
    },
    deleteItemBuilder(
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
    addUpdateMoveBuilder(
      state,
      action: PayloadAction<TConstructorIngredient[]>
    ) {
      state.constructorItems.ingredients = action.payload;
    },
    addMoveBunBuilder(state, action: PayloadAction<TIngredient>) {
      state.constructorItems.bun = action.payload;
    },
    clearBuilder(state) {
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
  addBunBuilder,
  addItemBuilder,
  deleteItemBuilder,
  addUpdateMoveBuilder,
  addMoveBunBuilder,
  clearBuilder
} = builderSlice.actions;

// Экспортирую редьюсер
export default builderSlice.reducer;
