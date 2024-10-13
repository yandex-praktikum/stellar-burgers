import { getOrdersApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getUserOrders = createAsyncThunk('order/getOrders', async () =>
  getOrdersApi()
);

export interface TOrdersState {
  orders: Array<TOrder>;
  loading: boolean;
}

const initialState: TOrdersState = {
  orders: [],
  loading: true
};

export const ordersListSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    listOfOrders: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(getUserOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserOrders.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const { listOfOrders } = ordersListSlice.selectors;

export default ordersListSlice;
