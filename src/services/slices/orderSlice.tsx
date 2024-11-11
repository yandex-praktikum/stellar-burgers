import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderBurgerApi, getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';

interface OrderState {
  currentOrder: TOrder | null;
  orderStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  isLoading: boolean;
}

const initialState: OrderState = {
  currentOrder: null,
  orderStatus: 'idle',
  error: null,
  isLoading: false
};

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (data: string[], { rejectWithValue }) => {
    try {
      const response = await orderBurgerApi(data);
      return response.order; // Возвращаем только объект заказа
    } catch (err) {
      return rejectWithValue('Failed to create order');
    }
  }
);

export const fetchOrderByNumber = createAsyncThunk(
  'order/fetchOrderByNumber',
  async (number: number, { rejectWithValue }) => {
    try {
      const response = await getOrderByNumberApi(number);
      return response.orders[0]; //первый заказ
    } catch (err) {
      return rejectWithValue('Failed to fetch order');
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearCurrentOrder: (state: OrderState) => {
      state.currentOrder = null;
    }
  },
  selectors: {
    selectCurrentOrder: (state: OrderState) => state.currentOrder,
    selectOrderStatus: (state: OrderState) => state.orderStatus,
    selectOrderError: (state: OrderState) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderStatus = 'loading';
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderStatus = 'succeeded';
        state.currentOrder = action.payload;
        state.isLoading = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderStatus = 'failed';
        state.error = action.payload as string;
        state.isLoading = false;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.orderStatus = 'succeeded';
        state.currentOrder = action.payload;
      });
  }
});

export const { selectCurrentOrder } = orderSlice.selectors;
export const { clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;
