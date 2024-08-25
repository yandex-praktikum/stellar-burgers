import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../../utils/burger-api';
import { TOrder } from '@utils-types';

type TOrderSlice = {
  orderInfo: TOrder | null;
  orderRequest: boolean;
  isLoading: boolean;
  postOrderError: string | null;
};

const initialState: TOrderSlice = {
  orderInfo: null,
  orderRequest: false,
  isLoading: false,
  postOrderError: null
};

export const postOrder = createAsyncThunk(
  'order/post',
  async (data: string[]) => {
    const order = await orderBurgerApi(data);
    return order;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderInfo: (state) => {
      state.orderInfo = null;
    }
  },
  selectors: {
    selectOrderInfo: (state) => state.orderInfo,
    selectOrderRequest: (state) => state.orderRequest
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrder.rejected, (state) => {
        state.orderRequest = false;
        state.isLoading = false;
        state.postOrderError === 'заказ не создан';
      })
      .addCase(postOrder.pending, (state) => {
        state.orderRequest = true;
        state.isLoading = true;
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.orderInfo = action.payload.order;
        state.isLoading = false;
        state.orderRequest = false;
      });
  }
});

export const { selectOrderInfo, selectOrderRequest } = orderSlice.selectors;
export const clearOrderInfo = orderSlice.actions;
export default orderSlice.reducer;
