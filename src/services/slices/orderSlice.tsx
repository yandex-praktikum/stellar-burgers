import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderBurgerApi, getOrderByNumberApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

type TOrderSlice = {
  orderData: TOrder | null;
  orderRequest: boolean;
  isLoading: boolean;
  postOrderError: string | null;
  fetchOrderById: string | null;
};

const initialState: TOrderSlice = {
  orderData: null,
  orderRequest: false,
  isLoading: false,
  postOrderError: null,
  fetchOrderById: null
};

export const postOrder = createAsyncThunk(
  'order/post',
  async (data: string[]) => {
    const order = await orderBurgerApi(data);
    console.log(order); //убрать перед отправкой
    console.log(order.success); //убрать перед отправкой
    return order;
  }
);

export const fetchOrderById = createAsyncThunk(
  'order/fetchById',
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
    selectOrderData: (state) => state.orderData,
    selectOrderRequest: (state) => state.orderRequest
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.isLoading = false;
        state.postOrderError = action.error.message as string;
      })
      .addCase(postOrder.pending, (state) => {
        state.orderRequest = true;
        state.isLoading = true;
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.orderData = action.payload.order;
        state.isLoading = false;
        state.orderRequest = false;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.orderRequest = false;
        state.isLoading = false;
        state.fetchOrderById = action.error.message as string;
      })
      .addCase(fetchOrderById.pending, (state) => {
        state.orderRequest = true;
        state.isLoading = true;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderRequest = true;
        state.orderData = action.payload.orders[0];
      });
  }
});

export const { selectOrderData, selectOrderRequest } = orderSlice.selectors;
export const { clearOrderData } = orderSlice.actions;
export default orderSlice.reducer;
