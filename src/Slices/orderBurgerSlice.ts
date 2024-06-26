import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TState = {
  ingredients: string[];
  orderData: null | TOrder;
  orderRequest: boolean;
};

const initialState: TState = {
  ingredients: [],
  orderData: null,
  orderRequest: false
};

export const orderBurgerThunk = createAsyncThunk(
  'order/burger',
  async (ingredients: string[]) => await orderBurgerApi(ingredients)
);

export const orderBurgerSlice = createSlice({
  name: 'orderBurger',
  initialState,
  reducers: {
    cleanOrderData: (state) => {
      state.orderData = null;
    },
    cleanConstructor: (state) => {
      state.ingredients = [];
    }
  },
  selectors: {
    selectOrderData: (state) => state.orderData,
    selectIngredients: (state) => state.ingredients,
    selectOrderRequest: (state) => state.orderRequest
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurgerThunk.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(orderBurgerThunk.fulfilled, (state, action) => {
        state.ingredients = action.payload.order.ingredients;
        state.orderData = action.payload.order;
        state.orderRequest = false;
      });
  }
});

export const orderBurgerReducer = orderBurgerSlice.reducer;
export const { selectOrderData, selectIngredients, selectOrderRequest } =
  orderBurgerSlice.selectors;
export const { cleanOrderData, cleanConstructor } = orderBurgerSlice.actions;
