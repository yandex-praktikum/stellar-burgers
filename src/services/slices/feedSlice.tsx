import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrdersApi } from '../../utils/burger-api';
import { TOrder } from '@utils-types';

export const getOrders = createAsyncThunk('orders/get', async () =>
  getOrdersApi()
);

type TFeedSlice = {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
};

const initialState: TFeedSlice = {
  orders: [],
  isLoading: false,
  error: null
};

export const feedSlice = createSlice({
  name: 'orders',
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
    selectOrders: (state) => state.orders
  }
});

export const { selectOrders } = feedSlice.selectors;
export default feedSlice.reducer;
