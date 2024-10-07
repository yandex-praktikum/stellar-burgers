import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import {
  getFeedsApi,
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi
} from '../../utils/burger-api';

interface IOrderState {
  order: TOrder | null;
  name: string | null;
  error: string | undefined;
  isLoading: boolean;
  orders: TOrder[];
  orderModal: TOrder[];
  profileOrders: TOrder[];
  costOrder: number | null;
  finalSum: number | null;
}
const initialState: IOrderState = {
  order: null,
  name: null,
  error: '',
  isLoading: false,
  orders: [],
  orderModal: [],
  profileOrders: [],
  costOrder: null,
  finalSum: null
};
export const getFeeds = createAsyncThunk('order/getFeeds', async () => {
  const result = await getFeedsApi();
  return result;
});
export const getOrders = createAsyncThunk('order/getOrders', async () => {
  const result = await getOrdersApi();
  return result;
});
export const getOrderById = createAsyncThunk(
  'order/getOrderById',
  async (orderId: number) => {
    const result = await getOrderByNumberApi(orderId);
    return result;
  }
);
export const makeOrder = createAsyncThunk(
  'order/makeOrder',
  async (data: string[]) => {
    const result = await orderBurgerApi(data);
    return result;
  }
);
export const orderSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.order = null;
      state.name = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.costOrder = action.payload.total;
        state.finalSum = action.payload.totalToday;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.costOrder = 0;
        state.finalSum = 0;
        state.orders = [];
      });
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profileOrders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(getOrderById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderModal = action.payload.orders;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(makeOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(makeOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.name = action.payload.name;
        state.order = action.payload.order;
      })
      .addCase(makeOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
  selectors: {
    orderSelector: (state) => state.order,
    isLoadingSelector: (state) => state.isLoading,
    ordersSelector: (state) => state.orders,
    orderModalSelector: (state) => state.orderModal[0],
    profileOrdersSelector: (state) => state.profileOrders,
    costSelector: (state) => state.costOrder,
    finalSumSelector: (state) => state.finalSum
  }
});

export const {
  orderSelector,
  isLoadingSelector,
  ordersSelector,
  orderModalSelector,
  profileOrdersSelector,
  costSelector,
  finalSumSelector
} = orderSlice.selectors;
export const { resetOrder } = orderSlice.actions;
