import { getOrderByNumberApi, getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const fetchUserOrders = createAsyncThunk(
  'orders/userOrders',
  getOrdersApi
);

export interface TOrderState {
  orders: Array<TOrder>;
  isLoading: boolean;
}

const initialState: TOrderState = {
  orders: [],
  isLoading: false
};

export const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {},
  selectors: {
    getOrdersSelector: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserOrders.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const { getOrdersSelector } = userOrdersSlice.selectors;
export const userOrdersReducer = userOrdersSlice.reducer;
