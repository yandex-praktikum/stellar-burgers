import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const fetchAllFeeds = createAsyncThunk('orders/getAll', getFeedsApi);

export interface TFeedsState {
  orders: Array<TOrder>;
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null | undefined;
}

const initialState: TFeedsState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: true,
  error: null
};

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    ordersSelector: (state) => state.orders,
    totalOrdersSelector: (state) => state.total,
    totalTodayOrdersSelector: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.loading = false;
      })
      .addCase(fetchAllFeeds.rejected, (state, action) => {
        state.orders = [];
        state.total = 0;
        state.totalToday = 0;
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAllFeeds.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      });
  }
});

export const { ordersSelector, totalOrdersSelector, totalTodayOrdersSelector } =
  feedsSlice.selectors;
export const feedsReducer = feedsSlice.reducer;
