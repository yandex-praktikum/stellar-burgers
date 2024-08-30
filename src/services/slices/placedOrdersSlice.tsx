import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export type TPlacedOrdersSlice = {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
};

export const initialState: TPlacedOrdersSlice = {
  orders: [],
  isLoading: false,
  error: null
};
export const getPlacedOrders = createAsyncThunk('placedOrders/get', async () =>
  getOrdersApi()
);

export const placedOrdersSlice = createSlice({
  name: 'placedOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPlacedOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      })
      .addCase(getPlacedOrders.pending, (state) => {
        state.isLoading = true;
        state.orders = [];
        state.error = null;
      })
      .addCase(getPlacedOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      });
  },
  selectors: {
    selectPlacedOrders: (state) => state.orders
  }
});

export const { selectPlacedOrders } = placedOrdersSlice.selectors;

export default placedOrdersSlice.reducer;
