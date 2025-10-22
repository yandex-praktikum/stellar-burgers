import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { getFeedsApi } from '@api';

type FeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  isLoading: boolean;
};

const initialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  status: 'idle',
  error: null,
  isLoading: false
};

// Thunks
export const getFeeds = createAsyncThunk('feed/getFeeds', async () => {
  const response = await getFeedsApi();
  return response;
});

// Слайс
const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    selectFeedOrders: (state: FeedState) => state.orders,
    selectFeedTotal: (state: FeedState) => state.total,
    selectFeedTotalToday: (state: FeedState) => state.totalToday,
    selectFeedStatus: (state: FeedState) => state.status,
    selectFeedError: (state: FeedState) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.isLoading = false;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch feeds';
        state.isLoading = false;
      });
  }
});

export default feedSlice.reducer;
