import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '../../../utils/types';
import { orderBurgerApi } from '../../../utils/burger-api';

type TNewOrderState = {
  order: TOrder | null;
  name: string;
  orderRequest: boolean;
};

type TNewOrderResponse = {
  order: TOrder;
  name: string;
};

export const initialState: TNewOrderState = {
  order: null,
  name: '',
  orderRequest: false
};

export const getNewOrder = createAsyncThunk(
  'order/getNewOrder',
  async (data: string[]) => {
    const response = await orderBurgerApi(data);
    return response;
  }
);

const NewOrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
      state.name = '';
      state.orderRequest = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Ожидание запроса
      .addCase(getNewOrder.pending, (state) => {
        state.orderRequest = true;
      })

      // При успешном запросе
      .addCase(
        getNewOrder.fulfilled,
        (state, action: PayloadAction<TNewOrderResponse>) => {
          state.orderRequest = false;
          state.order = action.payload.order;
          state.name = action.payload.name;
        }
      )

      // При неудачном запросе
      .addCase(getNewOrder.rejected, (state) => {
        state.orderRequest = false;
      });
  }
});

export const { clearOrder } = NewOrderSlice.actions;

export const getNewOrderModalData = (state: { newOrder: TNewOrderState }) =>
  state.newOrder.order;
export const getNewOrderName = (state: { newOrder: TNewOrderState }) =>
  state.newOrder.name;
export const getNewOrderRequest = (state: { newOrder: TNewOrderState }) =>
  state.newOrder.orderRequest;

const newOrderRequest = NewOrderSlice.reducer;
export default newOrderRequest;
