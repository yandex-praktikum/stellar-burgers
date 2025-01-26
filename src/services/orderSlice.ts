import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '../utils/types';
import { orderBurgerApi, getOrdersApi, getOrderByNumberApi } from '@api';

interface INewOrderState {
  orderModalData: TOrder | null;
  name: string;
  isLoading: boolean;
  orderRequest: boolean;
  orders: TOrder[] | null;
  error: string | null | undefined;
  orderByNumber: TOrder | null;
  orderByNumberIsLoading: boolean;
  orderByNumberError: string | null | undefined;
}

const initialState: INewOrderState = {
  orderModalData: null,
  name: '',
  isLoading: true,
  orderRequest: false,
  orders: null,
  error: null,
  orderByNumber: null,
  orderByNumberIsLoading: false,
  orderByNumberError: null
};

export const getOrdersThunk = createAsyncThunk(
  'order/getOrdersThunk',
  async () => {
    const orders = await getOrdersApi();
    return orders;
  }
);

export const getOrderByNumberThunk = createAsyncThunk(
  'order/getOrderByNumberThunk',
  async (number: number, thunkAPI) => {
    const order = await getOrderByNumberApi(number);
    return order;
  }
);

export const orderBurgerThunk = createAsyncThunk(
  'order/orderBurgerThunk',
  async (data: string[], thunkAPI) => {
    const feeds = await orderBurgerApi(data);
    if (!feeds.success) {
      return Promise.reject(data);
    }
    return feeds;
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: initialState,
  reducers: {
    clearOrders: (state) => {
      state.orderModalData = null;
    },
    setOrder: (state, action) => {
      state.orderModalData = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurgerThunk.pending, (state) => {
        state.isLoading = true;
        state.orderRequest = true;
      })
      .addCase(orderBurgerThunk.fulfilled, (state, action) => {
        state.orderModalData = action.payload.order;
        state.name = action.payload.name;
        state.isLoading = false;
        state.orderRequest = false;
      })
      .addCase(orderBurgerThunk.rejected, (state, payload) => {
        state.error = payload.error.message;
      })

      .addCase(getOrdersThunk.rejected, (state, payload) => {
        state.error = payload.error.message;
      })
      .addCase(getOrdersThunk.pending, (state) => {
        state.isLoading = true;
        state.orderRequest = true;
      })
      .addCase(getOrdersThunk.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
        state.orderRequest = false;
      })

      .addCase(getOrderByNumberThunk.rejected, (state, payload) => {
        state.orderByNumberError = payload.error.message;
      })
      .addCase(getOrderByNumberThunk.pending, (state) => {
        state.orderByNumberIsLoading = true;
      })
      .addCase(getOrderByNumberThunk.fulfilled, (state, action) => {
        state.orderByNumber = action.payload.orders[0];
        state.orderByNumberIsLoading = false;
      });
  },
  selectors: {
    selectOrderModalDataState: (sliceState: INewOrderState) =>
      sliceState.orderModalData,
    selectOrderRequestState: (sliceState: INewOrderState) =>
      sliceState.orderRequest,
    selectIsLoading: (sliceState) => sliceState.isLoading,
    selectOrders: (sliceState: INewOrderState) => sliceState.orders
  }
});

export const {
  selectOrderModalDataState,
  selectIsLoading,
  selectOrders,
  selectOrderRequestState
} = orderSlice.selectors;
export const { clearOrders, setOrder } = orderSlice.actions;
export default orderSlice.reducer;
