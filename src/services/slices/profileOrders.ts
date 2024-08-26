import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrdersApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

export const getUsersOrders = createAsyncThunk(
  'orders/getOrders',
  getOrdersApi
);

type TOrderState = {
  orders: Array<TOrder>;
  loading: boolean;
  error: string | null | undefined;
};

const initialState: TOrderState = {
  orders: [],
  loading: true,
  error: null
};

export const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {},
  selectors: {
    getOrders: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsersOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getUsersOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      });
  }
});

export const { getOrders } = profileOrdersSlice.selectors;

export const profileOrdersReducer = profileOrdersSlice.reducer;
