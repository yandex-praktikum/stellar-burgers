import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { error } from 'console';
import { act } from 'react-dom/test-utils';

const initialState: {
  orders: TOrder[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | undefined;
  total: number;
  totalToday: number;
} = {
  orders: [],
  isLoading: false,
  isError: false,
  errorMessage: '',
  total: 0,
  totalToday: 0
};

export const fetchOrders = createAsyncThunk(
  'orders/getOrders',
  async () => await getOrdersApi()
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        console.log('rejected action', JSON.stringify(action));
        state.isError = true;
        state.errorMessage = action?.error?.message;
        state.isLoading = false;
      })
      .addCase(fetchOrders.fulfilled, (state, action: any) => {
        console.log('fetch orders: ', JSON.stringify(action.success));
        state.isLoading = false;
        state.isError = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  }
});

export default ordersSlice.reducer;
