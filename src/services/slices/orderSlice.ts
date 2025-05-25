import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TUserOrdersState = {
  isLoad: boolean;
  userOrders: TOrder[];
};

const initialState: TUserOrdersState = {
  isLoad: false,
  userOrders: []
};

export const userOrdersThunk = createAsyncThunk<TOrder[]>(
  'orders/getUserOrders',
  async () => await getOrdersApi()
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userOrdersThunk.pending, (state) => {
        state.isLoad = true;
      })
      .addCase(userOrdersThunk.fulfilled, (state, action) => {
        state.isLoad = false;
        state.userOrders = action.payload;
      })
      .addCase(userOrdersThunk.rejected, (state, action) => {
        state.isLoad = false;
        console.error('userOrdersThunk rejected:', action.error?.message);
      });
  },
  selectors: {
    isLoading: (state) => state.isLoad,
    getUserOrders: (state) => state.userOrders
  }
});

export const { isLoading, getUserOrders } = ordersSlice.selectors;
export { initialState as initialStateOrder };
