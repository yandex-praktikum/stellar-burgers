import { orderBurgerApi, getOrdersApi, getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';
import {
  SerializedError,
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';

type TOrdersState = {
  isLoading: boolean;
  isOrderLoading: boolean;
  orders: TOrder[];
  error: null | SerializedError;
  orderModal: TOrder | null;
  orderNumber: TOrder[] | [];
  orderRequest: boolean;
};

const initialState: TOrdersState = {
  isLoading: false,
  isOrderLoading: false,
  orders: [],
  error: null,
  orderModal: null,
  orderNumber: [],
  orderRequest: false
};

export const fetchOrders = createAsyncThunk(
  'orders/post',
  async (data: string[]) => await orderBurgerApi(data)
);

export const getOrders = createAsyncThunk(
  'orders/get',
  getOrdersApi
);


export const fetchFeedsNumber = createAsyncThunk(
  'orders/fetchNumber',
  async (number: number) => getOrderByNumberApi(number)
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetOrderModal(state) {
      state.orderModal = null;
    }
  },
  selectors: {
    getOrderSelector: (state) => state.orderNumber[0]
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.orderRequest = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.orderModal = action.payload.order;
        state.orderRequest = false;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.error = action.error;
        state.orderRequest = false;
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(fetchFeedsNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeedsNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(fetchFeedsNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.orderNumber = action.payload.orders;
      });
  }
});

export default ordersSlice.reducer;

export const { resetOrderModal } = ordersSlice.actions;
export const { getOrderSelector } = ordersSlice.selectors;
