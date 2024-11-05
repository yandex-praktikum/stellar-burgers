import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '../../../utils/types';
import { getOrdersApi } from '../../../utils/burger-api';

type TOrderListState = {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
};

export const initialState: TOrderListState = {
  orders: [],
  isLoading: false,
  error: null
};

export const getOrderList = createAsyncThunk(
  'orders/getOrdersList',
  getOrdersApi
);

const orderListSlice = createSlice({
  name: 'orderList',
  initialState,
  reducers: {
    clearOrderList: (state) => {
      state.orders = [];
      state.isLoading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      //При ожидании запроса
      .addCase(getOrderList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      // При успешном запросе
      .addCase(
        getOrderList.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.isLoading = false;
          state.orders = action.payload;
        }
      )

      // При неудачном запросе
      .addCase(getOrderList.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { clearOrderList } = orderListSlice.actions;

export const getOrder = (state: { orderList: TOrderListState }) =>
  state.orderList.orders;
export const getOrderLoading = (state: { orderList: TOrderListState }) =>
  state.orderList.isLoading;
export const getOrderError = (state: { orderList: TOrderListState }) =>
  state.orderList.error;

const orderListReducer = orderListSlice.reducer;
export default orderListReducer;
