import { createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersApi } from '@api';

export const getUserOrders = createAsyncThunk<TOrder[]>(
  'userOrders/getUserOrders',
  async () => {
    const orders = await getOrdersApi();
    return orders;
  }
);
