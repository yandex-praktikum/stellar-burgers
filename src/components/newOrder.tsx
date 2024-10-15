import { orderBurgerApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RootState } from '../services/store';

export const newOrder = createAsyncThunk('order/createOrder', orderBurgerApi);

export interface TNewOrderState {
  loading: boolean;
  order: TOrder | null;
  error: string | undefined;
}

const initialState: TNewOrderState = {
  loading: false,
  order: null,
  error: undefined
};

export const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    resetOrder: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(newOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
      })
      .addCase(newOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(newOrder.pending, (state) => {
        state.loading = true;
      });
  }
});

export const { resetOrder } = newOrderSlice.actions;

export const newOrderLoad = (state: RootState) => state.newOrder.loading;
export const newOrderData = (state: RootState) => state.newOrder.order;

export default newOrderSlice;
