import {
  getFeedsApi,
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi
} from '../../../src/utils/burger-api';
import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  nanoid
} from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrderState = {
  feedOrders: TOrder[];
  profileOrders: TOrder[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | undefined;
  total: number;
  totalToday: number;
  orderModalData: TOrder | null;
  isOrderModalOpened: boolean;
};

export const initialState: TOrderState = {
  feedOrders: [],
  profileOrders: [],
  isLoading: false,
  isError: false,
  errorMessage: '',
  total: 0,
  totalToday: 0,
  isOrderModalOpened: false,
  orderModalData: null
};

export const fetchOrders = createAsyncThunk('orders/getOrders', getOrdersApi);

export const fetchFeed = createAsyncThunk('feed/getOrders', getFeedsApi);

export const fetchOrderBurger = createAsyncThunk(
  'burger/orderBurger',
  async (data: string[]) => await orderBurgerApi(data)
);

const ordersSlice = createSlice({
  name: 'orderReducer',
  initialState,
  reducers: {
    openOrderModalAction: (state) => {
      state.isOrderModalOpened = true;
    },
    closeOrderModalAction: (state) => {
      state.isOrderModalOpened = false;
    }
  },
  selectors: {
    selectOrderRequest: (state) => state.isLoading,
    selectFeedOrders: (state) => state.feedOrders,
    selectProfileOrders: (state) => state.profileOrders,
    selectTotal: (state) => state.total,
    selectTotalToday: (state) => state.totalToday,
    selectModalOrderData: (state) => state.orderModalData,
    selectIsModalOpened: (state) => state.isOrderModalOpened
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

export default ordersSlice;

export const { openOrderModalAction, closeOrderModalAction } =
  ordersSlice.actions;

export const {
  selectOrderRequest,
  selectFeedOrders,
  selectProfileOrders,
  selectTotal,
  selectTotalToday,
  selectModalOrderData,
  selectIsModalOpened
} = ordersSlice.selectors;
