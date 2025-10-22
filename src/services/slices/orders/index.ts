import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import {
  SerializedError,
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrdersState = {
  isOrderLoading: boolean;
  isOrdersLoading: boolean;
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: null | SerializedError;
  ordersData: TOrder[];
};

export const initialState: TOrdersState = {
  isOrderLoading: true,
  isOrdersLoading: true,
  orderRequest: false,
  orderModalData: null,
  error: null,
  ordersData: []
};

export const createOrder = createAsyncThunk<
  {
    order: TOrder;
    name: string;
  },
  string[]
>('orders/create', async (data, { rejectWithValue }) => {
  const response = await orderBurgerApi(data);

  if (!response?.success) {
    return rejectWithValue(response);
  }

  return { order: response.order, name: response.name };
});

export const fetchOrder = createAsyncThunk<TOrder, number>(
  'orders/fetchOrder',
  async (data, { rejectWithValue }) => {
    const response = await getOrderByNumberApi(data);

    if (!response?.success) {
      return rejectWithValue(response);
    }

    return response.orders[0];
  }
);

export const fetchOrders = createAsyncThunk<TOrder[], void>(
  'orders/fetchOrders',
  async () => await getOrdersApi()
);

const slice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetOrderModalData(state) {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.orderModalData = action.payload;
      })
      .addCase(fetchOrder.rejected, (state) => {
        state.isOrderLoading = false;
      })
      .addCase(fetchOrders.pending, (state) => {
        state.isOrdersLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isOrdersLoading = false;
        state.error = null;
        state.ordersData = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isOrdersLoading = false;
        state.error = action.error;
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
  },
  selectors: {
    selectOrders: (state) => state.ordersData,
    selectOrderModalData: (state) => state.orderModalData,
    selectIsOrderLoading: (state) => state.isOrderLoading,
    selectOrderRequest: (state) => state.orderRequest
  }
});

export const { resetOrderModalData } = slice.actions;

export default slice.reducer;

export const {
  selectOrders,
  selectOrderModalData,
  selectIsOrderLoading,
  selectOrderRequest
} = slice.selectors;
