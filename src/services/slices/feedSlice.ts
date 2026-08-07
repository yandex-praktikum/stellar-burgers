import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';
import {
  getFeedsApi,
  getOrdersApi,
  getOrderByNumberApi
} from '../../utils/burger-api';

type TFeedState = {
  feed: TOrdersData | null;
  feedOrders: TOrder[];
  profileOrders: TOrder[];
  currentOrder: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TFeedState = {
  feed: null,
  feedOrders: [],
  profileOrders: [],
  currentOrder: null,
  isLoading: false,
  error: null
};

export const getFeeds = createAsyncThunk<
  Awaited<ReturnType<typeof getFeedsApi>>
>('feed/getFeeds', async () => await getFeedsApi());

export const getOrders = createAsyncThunk<
  Awaited<ReturnType<typeof getOrdersApi>>
>('feed/getOrders', async () => await getOrdersApi());

export const getOrderByNumber = createAsyncThunk<
  Awaited<ReturnType<typeof getOrderByNumberApi>>,
  number
>('feed/getOrderByNumber', async (number) => await getOrderByNumberApi(number));

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feed = action.payload;
        state.feedOrders = action.payload.orders;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Не удалось загрузить ленту';
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profileOrders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message ?? 'Не удалось загрузить историю заказов';
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOrder = action.payload.orders[0];
      })

      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Не удалось загрузить заказ';
      });
  }
});

export const feedReducer = feedSlice.reducer;
