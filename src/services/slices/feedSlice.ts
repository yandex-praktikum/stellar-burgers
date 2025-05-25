import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';
import { getFeedsApi } from '@api';

type IngredientsState = {
  feeds: TOrdersData;
};

const initialState: IngredientsState = {
  feeds: {
    orders: [],
    total: 0,
    totalToday: 0
  }
};

export const FeedsThunk = createAsyncThunk(
  'feeds/getAll',
  async () => await getFeedsApi()
);

export const feedSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FeedsThunk.fulfilled, (state, action) => {
        state.feeds = action.payload;
      })
      .addCase(FeedsThunk.rejected, (_state, action) => {
        if (action.error) {
          console.error('FeedsThunk rejected:', action.error.message);
        }
      });
  },
  selectors: {
    getOrders: (state) => state.feeds.orders,
    getTotal: (state) => state.feeds.total,
    getTotalToday: (state) => state.feeds.totalToday
  }
});

export const { getOrders, getTotal, getTotalToday } = feedSlice.selectors;
export { initialState as initialStateFeeds };
