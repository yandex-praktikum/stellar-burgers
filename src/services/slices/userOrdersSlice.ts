import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersApi } from '../../utils/burger-api';

export const getOrders = createAsyncThunk('orders/userOrders', getOrdersApi);

type TOrders = {
  orders: TOrder[];
};

export const initialState: TOrders = {
  orders: []
};

const userOrdersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    getOrdersState: (state) => state,
    getUserOrders: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {})
      .addCase(getOrders.rejected, (state, action) => {})
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      });
  }
});

export const { getOrdersState, getUserOrders } = userOrdersSlice.selectors;

export const userOrdersReducer = userOrdersSlice.reducer;
