import { orderBurgerApi, getOrderByNumberApi, getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrderSlice = {
  orderData: TOrder | null;
  orders: TOrder[];
  orderRequest: boolean;
  orderById: string | null;
  error: string | null;
  isLoading: boolean;
};

const initialState: TOrderSlice = {
  orderData: null,
  orders: [],
  orderRequest: false,
  orderById: null,
  error: null,
  isLoading: false
};

export const postOrderBurger = createAsyncThunk(
  'order/post',
  async (data: string[]) => {
    const order = await orderBurgerApi(data);
    return order;
  }
);

export const getPlacedOrders = createAsyncThunk('placedOrders/get', async () =>
  getOrdersApi()
);

export const fetchOrderByNumber = createAsyncThunk(
  'order/fetch',
  async (data: number) => getOrderByNumberApi(data)
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderData: (state) => {
      state.orderData = null;
    }
  },
  selectors: {
    selectOrdersList: (state) => state.orders,
    selectOrderRequest: (state) => state.orderRequest,
    selectOrderData: (state) => state.orderData
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrderBurger.rejected, (state) => {
        state.orderRequest = false;
        state.isLoading = false;
        state.error = 'Ошибка оформления заказа';
      })
      .addCase(postOrderBurger.pending, (state) => {
        state.orderRequest = true;
        state.isLoading = true;
      })
      .addCase(postOrderBurger.fulfilled, (state, action) => {
        state.orderData = action.payload.order;
        state.isLoading = false;
        state.orderRequest = false;
      })
      .addCase(fetchOrderByNumber.rejected, (state) => {
        state.orderRequest = false;
        state.isLoading = false;
        state.orderById = 'Ошибка при загрузке заказа';
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.orderRequest = true;
        state.isLoading = true;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderRequest = true;
        state.orderData = action.payload.orders[0];
      })
      .addCase(getPlacedOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = 'Ошибка при загрузке заказа';
      })
      .addCase(getPlacedOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(getPlacedOrders.pending, (state) => {
        state.isLoading = true;
        state.orders = [];
        state.error = null;
      });
  }
});

export default orderSlice.reducer;
export const { clearOrderData } = orderSlice.actions;
export const { selectOrderData, selectOrderRequest, selectOrdersList } =
  orderSlice.selectors;
