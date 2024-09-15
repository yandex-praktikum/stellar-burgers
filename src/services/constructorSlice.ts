import {
  createSlice,
  PayloadAction,
  nanoid,
  createAsyncThunk
} from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient, TOrder } from '../utils/types';
import { orderBurgerApi } from '@api';

type TConstuctorState = {
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null;
};

const initialState: TConstuctorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  error: null
};

export const orderBurger = createAsyncThunk(
  'order/orderBurger',
  async (data: string[]) => await orderBurgerApi(data)
);

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload.id
        );
    },
    resetModalData: (state) => {
      state.orderModalData = null;
    },
    clearConstructor: (state) => {
      state = {
        ...initialState,
        constructorItems: initialState.constructorItems
      };
    },
    moveIngredient: (
      state,
      action: PayloadAction<{
        ingredient: TConstructorIngredient;
        moveTo: 'up' | 'down';
      }>
    ) => {
      const index = state.constructorItems.ingredients.findIndex(
        (item) => item.id === action.payload.ingredient.id
      );
      const ingredient = state.constructorItems.ingredients[index];
      switch (action.payload.moveTo) {
        case 'up':
          if (index > 0) {
            state.constructorItems.ingredients[index] =
              state.constructorItems.ingredients[index - 1];
            state.constructorItems.ingredients[index - 1] = ingredient;
          }
          break;
        case 'down':
          if (index < state.constructorItems.ingredients.length - 1) {
            state.constructorItems.ingredients[index] =
              state.constructorItems.ingredients[index + 1];
            state.constructorItems.ingredients[index + 1] = ingredient;
          }
          break;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
        state.constructorItems = {
          bun: null,
          ingredients: []
        };
        state.error = null;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message as string;
      });
  },
  selectors: {
    getConstructorState: (state) => state
  }
});

export const { getConstructorState } = constructorSlice.selectors;
export const {
  addIngredient,
  removeIngredient,
  clearConstructor,
  resetModalData,
  moveIngredient
} = constructorSlice.actions;
