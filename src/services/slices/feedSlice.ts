import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TOrdersData, TOrder } from '@utils-types';

interface FeedsState {
  feeds: TOrdersData;
  isLoading: boolean;
  error: string | null;
}

const initialState: FeedsState = {
  feeds: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  isLoading: true,
  error: null
};

export const fetchFeeds = createAsyncThunk(
  'feeds/get',
  async () => await getFeedsApi()
);

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    selectFeeds: (sliceState) => sliceState.feeds.orders,
    selectIsLoading: (sliceState) => sliceState.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.feeds.orders = [];
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feeds = action.payload;
      });
  }
});

export const { selectFeeds, selectIsLoading } = feedsSlice.selectors;

export default feedsSlice.reducer;
