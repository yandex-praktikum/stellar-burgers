import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getOrdersApi } from '../../utils/burger-api';

import type { TOrder } from '../../utils/types';

export const fetchUserOrders = createAsyncThunk('userOrders/fetch', async () => {
  const data = await getOrdersApi();
  // console.log(data)
  return data;
});

type TUserOrdersState = {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
};

const initialState: TUserOrdersState = {
  orders: [],
  isLoading: false,
  error: null,
};

const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Не удалось загрузить историю заказов';
      });
  },
});

export default userOrdersSlice.reducer;
