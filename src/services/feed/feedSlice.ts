import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { loadFeed } from './action';
import type { TFeedPayload } from './action';

export type FeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  feedRequest: boolean;
};

const initialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  feedRequest: false
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadFeed.pending, (state) => {
        state.feedRequest = true;
      })
      .addCase(loadFeed.fulfilled, (state, action) => {
        state.feedRequest = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(loadFeed.rejected, (state, action) => {
        state.feedRequest = false;
      });
  }
});
