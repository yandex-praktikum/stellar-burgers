import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getFeedsApi,
  getOrderByNumberApi,
  getOrdersApi
} from '../../utils/burger-api';

type ordersState = {
  feeds: TOrder[];
  orders: TOrder[];
  total: number;
  totalToday: number;
  error: string | null;
  selectedOrder: TOrder | null;
};

const initialState: ordersState = {
  feeds: [],
  orders: [],
  total: 0,
  totalToday: 0,
  error: '',
  selectedOrder: null
};

export const fetchFeeds = createAsyncThunk('orders/fetchFeeds', async () =>
  getFeedsApi()
);

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () =>
  getOrdersApi()
);

export const fetchOrderByNumber = createAsyncThunk(
  'orders/fetchOrderByNumber',
  async (number: number) => getOrderByNumberApi(number)
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.feeds = [];
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.feeds = action.payload.orders!;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.error = null;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.error = action.error.message!;
      })

      .addCase(fetchOrders.pending, (state) => {
        state.orders = [];
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.error = action.error.message!;
      })

      .addCase(fetchOrderByNumber.pending, (state) => {
        state.selectedOrder = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.selectedOrder = action.payload.orders[0];
        state.error = null;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.selectedOrder = null;
        state.error = action.error.message!;
      });
  }
});

export default ordersSlice;
