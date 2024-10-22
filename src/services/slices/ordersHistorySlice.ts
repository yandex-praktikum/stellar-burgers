import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { getOrderByNumberApi, orderBurgerApi } from '../../utils/burger-api';

type TOrdersSliceState = {
  orderDetails: TOrder | null;
  loading: boolean;
  orderClaim: boolean;
  orderError: string | null;
  orderId: string | null;
};
export const initialState: TOrdersSliceState = {
  orderDetails: null,
  loading: false,
  orderClaim: false,
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
      state.orderDetails = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => ({
        ...state,
        loading: true,
        orderClaim: true
      }))
      .addCase(fetchOrders.fulfilled, (state, action) => ({
        ...state,
        orderDetails: action.payload.order,
        loading: false,
        orderClaim: false
      }))
      .addCase(fetchOrders.rejected, (state, action) => ({
        ...state,
        orderClaim: false,
        loading: false,
        orderError: action.error.message || null
      }))
      .addCase(retrieveOrderByNumber.pending, (state) => ({
        ...state,
        orderClaim: true,
        loading: true
      }))
      .addCase(retrieveOrderByNumber.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        orderClaim: true,
        orderDetails: action.payload.orders[0]
      }))
      .addCase(retrieveOrderByNumber.rejected, (state, action) => ({
        ...state,
        orderClaim: false,
        loading: false,
        orderError: action.error.message || null
      }));
  },
  selectors: {
    selectOrders: (state) => state.orderDetails,
    selectquery: (state) => state.orderClaim
  }
});
export default ordersSlice.reducer;
export const { selectOrders, selectquery } = ordersSlice.selectors;
export const { clearOrders } = ordersSlice.actions;
