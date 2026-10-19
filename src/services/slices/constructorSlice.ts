import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';

import { orderBurgerApi } from '../../utils/burger-api';

import type { TConstructorIngredient, TOrder, TIngredient } from '../../utils/types';
import type { PayloadAction } from '@reduxjs/toolkit';

export const createOrder = createAsyncThunk(
  'burgerConstructor/createOrder',
  async (ingredientIds: string[]) => {
    const res = await orderBurgerApi(ingredientIds);
    console.log(7777);
    console.log(res);
    return res.order;
  }
);

type TBurgerConstructorSliceState = {
  bun: TConstructorIngredient | null; // используем TConstructorIngredient, как в типе Практикума
  ingredients: TConstructorIngredient[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null;
};

const initialState: TBurgerConstructorSliceState = {
  bun: null,
  ingredients: [],
  orderRequest: false,
  orderModalData: null,
  error: null,
};

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() },
      }),
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      // const ingredient = action.payload;

      // if (ingredient.type === 'bun') {
      //   state.bun = ingredient;
      // } else {
      //   state.ingredients.push({ ...ingredient, id: nanoid() });
      // }
    },
    removeIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter((item) => item.id !== action.payload);
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
    resetOrderModal: (state) => {
      state.orderModalData = null;
    },
    moveIngredient: (state, action) => {
      const { index, direction } = action.payload;
      const ingredients = state.ingredients;

      const targetIndex = direction === 'up' ? index - 1 : index + 1;

      if (targetIndex >= 0 && targetIndex < ingredients.length) {
        [ingredients[index], ingredients[targetIndex]] = [
          ingredients[targetIndex],
          ingredients[index],
        ];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
        state.bun = null;
        state.ingredients = [];
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message || 'Ошибка при создании заказа';
      });
  },
});

export const {
  addIngredient,
  removeIngredient,
  clearConstructor,
  resetOrderModal,
  moveIngredient,
} = constructorSlice.actions;
export default constructorSlice.reducer;
