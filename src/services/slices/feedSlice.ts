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
export const fetchFeeds = createAsyncThunk('orders/all', async () => {
  const response = await getFeedsApi();
  return response;
});

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, handleFetchFeedsPending)
      .addCase(fetchFeeds.fulfilled, handleFetchFeedsFulfilled)
      .addCase(fetchFeeds.rejected, handleFetchFeedsRejected);
  }
});

// Обработчики для каждого состояния
const handleFetchFeedsPending = (state: TFeedSliceState) => {
  state.isLoading = true;
  state.error = null;
};

const handleFetchFeedsFulfilled = (state: TFeedSliceState, action: any) => {
  state.feed.total = action.payload.total;
  state.feed.totalToday = action.payload.totalToday;
  state.isLoading = false;
  state.orders = action.payload.orders;
};

const handleFetchFeedsRejected = (state: TFeedSliceState, action: any) => {
  state.isLoading = false;
  state.error = action.error.message as string;
};

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
