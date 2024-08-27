import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrdersApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

export const getOrders = createAsyncThunk('orders/get', async () =>
  getOrdersApi()
);

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
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = true;
        state.orders = action.payload;
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
