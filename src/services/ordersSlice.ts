import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  orderBurgerApi,
  getOrdersApi,
  getOrderByNumberApi,
  getFeedsApi
} from '@api';
import { TOrder } from '@utils-types';

interface IOrdersState {
  order: TOrder | null;
  orders: TOrder[];
  feedOrders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null | undefined;
}

const initialState: IOrdersState = {
  order: null,
  orders: [],
  feedOrders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

export const createOrder = createAsyncThunk(
  'ordersFeeds/createOrder',
  async (ingredients: string[]) => {
    const response = await orderBurgerApi(ingredients);
    return response;
  }
);

export const fetchOrders = createAsyncThunk(
  'ordersFeeds/fetchOrders',
  async () => {
    const response = await getOrdersApi();
    return response;
  }
);

export const fetchOrderByNumber = createAsyncThunk(
  'ordersFeeds/fetchOrderByNumber',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);
    return response;
  }
);

export const fetchFeeds = createAsyncThunk(
  'ordersFeeds/fetchFeeds',
  async () => {
    const response = await getFeedsApi();
    return response;
  }
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
    }
  },
  selectors: {
    getOrder: (state) => state.order,
    getLoading: (state) => state.loading,
    getOrders: (state) => state.orders,
    getTotal: (state) => state.total,
    getTotalToday: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchOrderByNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.orders[0];
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.feedOrders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { clearOrder } = ordersSlice.actions;
export const { getOrder, getLoading, getOrders, getTotal, getTotalToday } =
  ordersSlice.selectors;
export default ordersSlice.reducer;
