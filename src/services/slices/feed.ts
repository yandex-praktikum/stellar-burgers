import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../utils/burger-api';
import { TOrdersData } from '../../utils/types';

export const getFeedsList = createAsyncThunk(
  'ingredients/getFeeds',
  getFeedsApi
);

type TFeedsState = {
  feeds: TOrdersData;
  loading: boolean;
  error: string | null | undefined;
};

const initialState: TFeedsState = {
  feeds: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  loading: false,
  error: null
};

export const feedsSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getFeedsState: (state) => state,
    getFeedsLoadingState: (state) => state.loading,
    getFeeds: (state) => state.feeds,
    getOrders: (state) => state.feeds.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeedsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getFeedsList.fulfilled, (state, action) => {
        state.loading = false;
        state.feeds = action.payload;
      });
  }
});

export const { getFeedsState, getFeedsLoadingState, getFeeds, getOrders } =
  feedsSlice.selectors;

export const feedReducer = feedsSlice.reducer;
