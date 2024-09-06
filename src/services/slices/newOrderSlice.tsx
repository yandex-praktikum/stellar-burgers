import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const takeNewOrder = createAsyncThunk(
  'order/createOrder',
  orderBurgerApi
);

export interface TNewOrderState {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | undefined;
}

const initialState: TNewOrderState = {
  orderRequest: false,
  orderModalData: null,
  error: undefined
};

export const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    resetOrder: (state) => (state = initialState)
  },
  selectors: {
    orderRequestSelector: (state) => state.orderRequest,
    orderModalDataSelector: (state) => state.orderModalData
  },
  extraReducers: (builder) => {
    builder
      .addCase(takeNewOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(takeNewOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(takeNewOrder.rejected, (state, action) => {
        state.error = action.error.message;
      });
  }
});

export const { resetOrder } = newOrderSlice.actions;
export const { orderRequestSelector, orderModalDataSelector } =
  newOrderSlice.selectors;
export const newOrderReducer = newOrderSlice.reducer;
