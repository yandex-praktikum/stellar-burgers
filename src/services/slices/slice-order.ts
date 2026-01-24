import { getOrderByNumberApi, orderBurgerApi, TNewOrderResponse } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type OrderState = {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  orderDetailsRequest: boolean;
  orderDetails: TOrder | null;
  error: string | null;
  orderDetailsError: string | null;
};

const initialState: OrderState = {
  orderRequest: false,
  orderModalData: null,
  orderDetailsRequest: false,
  orderDetails: null,
  error: null,
  orderDetailsError: null
};

type TServerError = {
  message?: string;
};

const getErrorMessage = (err: unknown): string | null => {
  if (typeof err === 'object' && err !== null && 'message' in err) {
    const message = (err as TServerError).message;
    return typeof message === 'string' ? message : null;
  }
  return null;
};

// запрос выполняетсья очень долгое время тестил и через пастман и отдельно долго рпиходит ответ
export const placeOrder = createAsyncThunk<
  TNewOrderResponse,
  string[],
  { rejectValue: string | null }
>('order', async (data, { rejectWithValue }) => {
  try {
    return await orderBurgerApi(data);
  } catch (err) {
    return rejectWithValue(getErrorMessage(err));
  }
});

// very long request

export const fetchOrderByNumber = createAsyncThunk<
  TOrder,
  number,
  { rejectValue: string | null }
>('order/byNumber', async (number, { rejectWithValue }) => {
  try {
    const data = await getOrderByNumberApi(number);
    if (!data.success || !data.orders.length) {
      return rejectWithValue('Order not found');
    }
    return data.orders[0];
  } catch (err) {
    return rejectWithValue(getErrorMessage(err));
  }
});

const orderSlice = createSlice({
  name: 'order/request',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.payload || null;
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.orderDetailsRequest = true;
        state.orderDetailsError = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.orderDetailsRequest = false;
        state.orderDetails = action.payload;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.orderDetailsRequest = false;
        state.orderDetailsError = action.payload || null;
      });
  }
});

export const { clearOrder } = orderSlice.actions;

export const orderReducer = orderSlice.reducer;
