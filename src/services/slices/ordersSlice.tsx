import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { getOrderByNumberApi, orderBurgerApi } from '../../utils/burger-api';

type TOrdersSliceState = {
  orderSummary: TOrder | null;
  isLoading: boolean;
  orderClaim: boolean; // orderRequest: boolean;
  orderError: string | null;
  orderId: string | null;
};
export const initialState: TOrdersSliceState = {
  orderSummary: null,
  isLoading: false,
  orderClaim: false, // orderRequest: boolean;
  orderError: null,
  orderId: null
};

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (data: string[]) => {
    const response = await orderBurgerApi(data);
    return response;
  }
);

export const retrieveOrderByNumber = createAsyncThunk(
  'order/retrieveById',
  async (data: number) => getOrderByNumberApi(data)
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrders: (state) => {
      state.orderSummary = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.orderClaim = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orderSummary = action.payload.order;
        state.isLoading = false;
        state.orderClaim = false;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.orderClaim = false;
        state.isLoading = false;
        state.orderError = action.error.message as string;
      })
      .addCase(retrieveOrderByNumber.pending, (state, action) => {
        //В период ожидания
        state.orderClaim = true;
        state.isLoading = true;
      })
      .addCase(retrieveOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderClaim = true;
        state.orderSummary = action.payload.orders[0];
      })
      .addCase(retrieveOrderByNumber.rejected, (state, action) => {
        state.orderClaim = false;
        state.isLoading = false;
        state.orderId = action.error.message as string;
      });
  },
  selectors: {
    selectOrders: (state) => state.orderSummary,
    selectquery: (state) => state.orderClaim
  }
});
export default ordersSlice.reducer;
export const { selectOrders, selectquery } = ordersSlice.selectors;
export const { clearOrders } = ordersSlice.actions;
