import { getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TInitialState = {
  isLoading: boolean;
  orderData: null | TOrder;
};

const initialState: TInitialState = {
  isLoading: false,
  orderData: null
};

export const gerOrderByNumber = createAsyncThunk(
  'order/getByNumber',
  async (orderNumber: number) => getOrderByNumberApi(orderNumber)
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    selectOrder: (state) => state.orderData,
    selectIsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(gerOrderByNumber.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(gerOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderData = action.payload.orders[0];
      });
  }
});

export const { selectOrder, selectIsLoading } = orderSlice.selectors;
export const orderReducer = orderSlice.reducer;
