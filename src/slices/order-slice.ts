import {
  createSlice,
  createAsyncThunk,
  SerializedError
} from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';
import { orderBurgerApi, getOrderByNumberApi, getOrdersApi } from '@api';
import { RootState } from 'src/services/store';

export interface IOrderState {
  order: TOrder[];
  orderRequest: boolean;
  orderError: null | SerializedError;
  orderModalData: TOrder | null;
  isLoadingNumber: boolean;
  isLoadingOrder: boolean;
}

export const initialState: IOrderState = {
  order: [],
  orderRequest: false,
  orderError: null,
  orderModalData: null,
  isLoadingNumber: true,
  isLoadingOrder: true
};

export const createOrder = createAsyncThunk<
  {
    order: TOrder;
    name: string;
  },
  string[]
>('order/createOrder', async (ingredients, { rejectWithValue }) => {
  try {
    const response = await orderBurgerApi(ingredients);
    return response;
  } catch (error) {
    return rejectWithValue(
      (error as { message?: string }).message || 'Ошибка создания заказа'
    );
  }
});

export const fetchOrderNumber = createAsyncThunk<TOrder, number>(
  'orders/fetchOrder',
  async (data, { rejectWithValue }) => {
    const response = await getOrderByNumberApi(data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response.orders[0];
  }
);

export const fetchOrder = createAsyncThunk(
  'orders/fetchOrders',
  async () => await getOrdersApi()
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    closeOrderModalData(state) {
      state.orderModalData = null;
      state.orderRequest = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderNumber.pending, (state) => {
        state.isLoadingNumber = true;
      })
      .addCase(fetchOrderNumber.fulfilled, (state, action) => {
        state.isLoadingNumber = false;
        state.orderModalData = action.payload;
      })
      .addCase(fetchOrderNumber.rejected, (state) => {
        state.isLoadingNumber = false;
      })
      .addCase(fetchOrder.pending, (state) => {
        state.isLoadingOrder = true;
        state.orderError = null;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.isLoadingOrder = false;
        state.orderError = null;
        state.order = action.payload;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.isLoadingOrder = false;
        state.orderError = action.error;
      })
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
      });
  }
});

export const orderDataSelector = (number: string) => (state: RootState) => {
  if (state.order.order?.length) {
    const data = state.order.order.find(
      (order) => order.number === Number(number)
    );
    if (data) return data;
  }

  if (state.feed.items?.orders.length) {
    const data = state.feed.items?.orders?.find(
      (order) => order.number === Number(number)
    );
    if (data) return data;
  }

  if (state.order.orderModalData?.number) {
    return state.order.orderModalData;
  }

  return null;
};

export const selectOrders = (state: RootState): TOrder[] => state.order.order;
export const selectOrderRequest = (state: RootState) =>
  state.order.orderRequest;
export const selectOrderModalData = (state: RootState) =>
  state.order.orderModalData;
export const { closeOrderModalData } = orderSlice.actions;

export default orderSlice.reducer;
