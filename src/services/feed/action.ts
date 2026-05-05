import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TOrder } from '@utils-types';

export type TFeedPayload = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export const loadFeed = createAsyncThunk<
  TFeedPayload,
  void,
  { rejectValue: string }
>('feed/loadFeed', async (_, { rejectWithValue }) => {
  try {
    const data = await getFeedsApi();
    return {
      orders: data.orders,
      total: data.total,
      totalToday: data.totalToday
    };
  } catch (error) {
    return rejectWithValue('не удалось загрузить ленту' as const);
  }
});
