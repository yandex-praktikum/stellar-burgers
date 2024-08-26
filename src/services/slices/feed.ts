import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

export const getFeedsInfo = createAsyncThunk('orders/all', async () =>
  getFeedsApi()
);

type TFeedsState = {
  orders: Array<TOrder>;
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null | undefined;
};

const initialState: TFeedsState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

export const feedsSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getOrdersInfo: (state) => state.orders,
    getTotalFeeds: (state) => state.total,
    getTotalTodayFeeds: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedsInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeedsInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getFeedsInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  }
});

export const { getOrdersInfo, getTotalFeeds, getTotalTodayFeeds } =
  feedsSlice.selectors;

export const feedReducer = feedsSlice.reducer;
