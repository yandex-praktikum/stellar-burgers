import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  orderBurgerApi
);

type TOrderState = {
  orderRequest: boolean;
  order: TOrder | null;
  error: string | null | undefined;
};

const initialState: TOrderState = {
  orderRequest: false,
  order: null,
  error: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => initialState
  },
  selectors: {
    getOrderRequest: (state) => state.orderRequest,
    getOrder: (state) => state.order
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.order = action.payload.order;
      });
  }
});

export const { resetOrder } = orderSlice.actions;
export const { getOrderRequest, getOrder } = orderSlice.selectors;

export const orderReducer = orderSlice.reducer;
