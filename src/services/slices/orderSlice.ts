import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../../utils/burger-api';
import { TNewOrder } from '@utils-types';

type TOrderState = {
  orderModalData: TNewOrder | null;
  orderRequest: boolean;
  error: string | null;
};

const initialState: TOrderState = {
  orderModalData: null,
  orderRequest: false,
  error: null
};

export const orderBurger = createAsyncThunk<
  Awaited<ReturnType<typeof orderBurgerApi>>,
  string[]
>('order/create', async (ingredients) => await orderBurgerApi(ingredients));

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder(state) {
      state.orderModalData = null;
      state.error = null;
      state.orderRequest = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message ?? 'Не удалось оформить заказ';
      });
  }
});

export const { clearOrder } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
