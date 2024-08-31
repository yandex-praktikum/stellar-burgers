import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TOrder } from '@utils-types';

interface IFeedsState {
  feedOrders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null | undefined;
}

const initialState: IFeedsState = {
  feedOrders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

export const fetchFeeds = createAsyncThunk('feeds/fetch', async () => {
  const response = await getFeedsApi();
  return response;
});

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    getOrders: (state) => state.feedOrders,
    getOrdersTotal: (state) => state.total,
    getOrdersTotalToday: (state) => state.totalToday,
    getLoadingFeed: (state) => state.loading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.feedOrders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default feedsSlice.reducer;
export const {
  getOrders,
  getOrdersTotal,
  getOrdersTotalToday,
  getLoadingFeed
} = feedsSlice.selectors;
