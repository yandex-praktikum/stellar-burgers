import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TFeedsState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  feedsRequesting: boolean;
  feedsError: string | null;
};

const initialState: TFeedsState = {
  orders: [],
  total: 0,
  totalToday: 0,
  feedsRequesting: false,
  feedsError: null
};

export const getFeeds = createAsyncThunk('order/getFeeds', async () => {
  const feeds = await getFeedsApi();
  return feeds;
});

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.feedsRequesting = true;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.feedsRequesting = false;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.feedsError = action.error.message as string;
        state.feedsRequesting = false;
      });
  }
});

export default feedsSlice.reducer;
