import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getUserOrders } from './action';

type UserOrdersState = {
  orders: TOrder[];
  ordersRequest: boolean;
  ordersError: string | null;
};

const initialState: UserOrdersState = {
  orders: [],
  ordersRequest: false,
  ordersError: null
};

export const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrders.pending, (state) => {
        state.ordersRequest = true;
        state.ordersError = null;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.ordersRequest = false;
        state.orders = action.payload;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.ordersRequest = false;
        state.ordersError = action.error.message || 'Ошибка загрузки заказов';
      });
  }
});
