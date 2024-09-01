import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi, getOrdersApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

export const getFeeds = createAsyncThunk('orders/get', async () => {
  const fetchFeed = getFeedsApi();
  console.log(fetchFeed);
  return fetchFeed;
});

type TFeedSlice = {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
  feed: {
    total: number;
    totalToday: number;
  };
};

const initialState: TFeedSlice = {
  orders: [],
  isLoading: false,
  error: null,
  feed: {
    total: 0,
    totalToday: 0
  }
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.isLoading = true;
        state.orders = action.payload.orders;
        state.feed.total = action.payload.total;
        state.feed.totalToday = action.payload.totalToday;
      });
  },
  selectors: {
    selectOrders: (state) => state.orders,
    selectFeed: (state) => state.feed
  }
});

export const { selectOrders, selectFeed } = feedSlice.selectors;
export const feedSliceName = feedSlice.name;
export default feedSlice.reducer;
