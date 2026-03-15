import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi, getOrderByNumberApi } from '../../../utils/burger-api';
import { TOrder } from '../../../utils/types';
import { getOrdersApi } from '../../../utils/burger-api';

export const fetchFeeds = createAsyncThunk('feed/getAll', getFeedsApi);

export const fetchOrderByNumber = createAsyncThunk(
  'feed/getOrderByNumber',
  async (number: number) => await getOrderByNumberApi(number)
);

export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  async () => await getOrdersApi()
);

interface FeedState {
  orders: TOrder[];
  userOrders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  selectedOrder: TOrder | null;
  error: string | null;
}

export const initialState: FeedState = {
  orders: [],
  userOrders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  selectedOrder: null,
  error: null
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch feed';
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.selectedOrder = action.payload.orders[0];
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userOrders = action.payload;
      });
  }
});

export const { clearSelectedOrder } = feedSlice.actions;
export default feedSlice.reducer; //test
