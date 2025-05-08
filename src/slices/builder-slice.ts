import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../services/store';

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
    moveItems: (
      state,
      action: PayloadAction<{ index: number; direction: 'up' | 'down' }>
    ) => {
      const { index, direction } = action.payload;
      const ingredients = [...state.constructorItems.ingredients];
      const newIndex = direction === 'up' ? index - 1 : index + 1;

      if (newIndex < 0 || newIndex >= ingredients.length) {
        return;
      }

      [ingredients[index], ingredients[newIndex]] = [
        ingredients[newIndex],
        ingredients[index]
      ];
      state.constructorItems.ingredients = ingredients;
    },
    clearBuilder(state) {
      state.constructorItems = {
        bun: null,
        ingredients: []
      };
    }
  }
});

export const selectConstructorItems = (state: RootState) =>
  state.builder.constructorItems;
export const selectBun = (state: RootState) =>
  state.builder.constructorItems.bun;
export const selectConstructorTotalCount = (state: RootState) =>
  state.builder.constructorItems.ingredients.length;

export const {
  addBunBuilder,
  addItemBuilder,
  deleteItemBuilder,
  moveItems,
  clearBuilder
} = builderSlice.actions;

export default builderSlice.reducer;
