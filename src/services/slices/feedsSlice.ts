import { getFeedsApi } from '@api';
import { TOrder, TOrdersData } from '@utils-types';
import {
  SerializedError,
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';

type TFeedsState = {
  isLoading: boolean;
  error: null | SerializedError;
  feeds: TOrdersData;
};

export const initialState: TFeedsState = {
  isLoading: true,
  error: null,
  feeds: {
    orders: [],
    total: 0,
    totalToday: 0
  }
};

export const fetchFeeds = createAsyncThunk<TOrdersData>(
  'feeds/fetchFeeds',
  async () => await getFeedsApi()
);

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    getAllOrdersSelector: (state) => state.feeds.orders,
    getFeedsSelector: (state) => state.feeds
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.feeds = { ...action.payload };
      });
  }
});

export default feedsSlice.reducer;

export const { getAllOrdersSelector, getFeedsSelector } = feedsSlice.selectors;
