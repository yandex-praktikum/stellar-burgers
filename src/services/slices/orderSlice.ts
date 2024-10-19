import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';

type TOrdersState = {
  isOrderLoading: boolean;
  isOrdersLoading: boolean;
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: null | string;
  data: TOrder[];
};
export const initialState: TOrdersState = {
  isOrderLoading: true,
  isOrdersLoading: true,
  orderRequest: false,
  orderModalData: null,
  error: null,
  data: []
};
export const getOrders = createAsyncThunk(
  'order/getOrders',
  async (): Promise<any> => await getOrdersApi()
);
export const createOrder = createAsyncThunk<
  {
    order: TOrder;
    name: string;
  },
  string[]
>('order/createOrder', async (data, { rejectWithValue }) => {
  const response = await orderBurgerApi(data);
  if (!response?.success) {
    return rejectWithValue(response);
  }
  return { order: response.order, name: response.name };
});
export const getOrder = createAsyncThunk<TOrder, number>(
  'order/getOrder',
  async (data, { rejectWithValue }) => {
    const response = await getOrderByNumberApi(data);
    if (!response?.success) {
      return rejectWithValue(response);
    }
    return response.orders[0];
  }
);
export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrder.pending, (state: TOrdersState) => {
        state.isOrderLoading = true;
      })
      .addCase(getOrder.fulfilled, (state: TOrdersState, action) => {
        state.isOrderLoading = false;
        state.orderModalData = action.payload;
      })
      .addCase(getOrder.rejected, (state: TOrdersState) => {
        state.isOrderLoading = false;
      })
      .addCase(getOrders.pending, (state: TOrdersState) => {
        state.isOrdersLoading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state: TOrdersState, action) => {
        state.isOrdersLoading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(getOrders.rejected, (state: TOrdersState, action: any) => {
        state.isOrdersLoading = false;
        state.error = action.error;
      })
      .addCase(createOrder.pending, (state: TOrdersState) => {
        state.orderRequest = true;
      })
      .addCase(createOrder.fulfilled, (state: TOrdersState, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(createOrder.rejected, (state: TOrdersState, action) => {
        state.orderRequest = false;
      });
  }
});

export const {} = orderSlice.actions;
export default orderSlice.reducer;
