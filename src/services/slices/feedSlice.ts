import {
  createSlice,
  createAsyncThunk,
  createSelector
} from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsApi } from '@api';

type TFeedSliceState = {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
  feed: {
    total: number;
    totalToday: number;
  };
};

export const initialState: TFeedSliceState = {
  orders: [],
  isLoading: false,
  error: null,
  feed: {
    total: 0,
    totalToday: 0
  }
};

// Асинхронный thunk для получения информации о заказах
export const fetchFeeds = createAsyncThunk('orders/get', async () => {
  const response = await getFeedsApi();
  return response;
});

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.feed.total = action.payload.total;
        state.feed.totalToday = action.payload.totalToday;
        state.isLoading = false;
        state.orders = action.payload.orders;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      });
  }
});

// Селекторы с использованием createSelector
const selectFeedState = (state: { feed: TFeedSliceState }) => state.feed;

export const selectOrders = createSelector(
  [selectFeedState],
  (feed) => feed.orders
);

export const selectFeed = createSelector(
  [selectFeedState],
  (feed) => feed.feed
);

export default feedSlice.reducer;
