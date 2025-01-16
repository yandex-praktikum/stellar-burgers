import {
  getFeedsApi,
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { error } from 'console';
import { act } from 'react-dom/test-utils';

const initialState: {
  feedOrders: TOrder[];
  profileOrders: TOrder[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | undefined;
  total: number;
  totalToday: number;
  orderModalData?: TOrder;
  isOrderModalOpened: boolean;
} = {
  feedOrders: [],
  profileOrders: [],
  isLoading: false,
  isError: false,
  errorMessage: '',
  total: 0,
  totalToday: 0,
  isOrderModalOpened: false
};

export const fetchOrders = createAsyncThunk(
  'orders/getOrders',
  async () => await getOrdersApi()
);

export const fetchOrderById = createAsyncThunk(
  'orders/getOrderById',
  async (id: number) => await getOrderByNumberApi(id)
);

export const fetchFeed = createAsyncThunk(
  'feed/getOrders',
  async () => await getFeedsApi()
);

export const fetchOrderBurger = createAsyncThunk(
  'burger/orderBurger',
  async (data: string[]) => await orderBurgerApi(data)
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    openOrderModalAction: (state) => {
      state.isOrderModalOpened = true;
    },
    closeOrderModalAction: (state) => {
      state.isOrderModalOpened = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isError = true;
        state.errorMessage = action?.error?.message;
        state.isLoading = false;
      })
      .addCase(fetchOrders.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.isError = false;
        state.profileOrders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchOrderById.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        console.log('fetch orders by id: ', JSON.stringify(action));
        state.isLoading = false;
        state.isError = false;
        state.profileOrders = action.payload.orders;
      })
      .addCase(fetchFeed.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.feedOrders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchOrderBurger.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        console.log('fetch order pending');
      })
      .addCase(fetchOrderBurger.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
        state.isOrderModalOpened = false;
      })
      .addCase(fetchOrderBurger.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.orderModalData = action.payload.order;
        state.isOrderModalOpened = true;
      });
  }
});

export default ordersSlice.reducer;

export const { openOrderModalAction, closeOrderModalAction } =
  ordersSlice.actions;
