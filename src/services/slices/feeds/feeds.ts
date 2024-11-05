import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '../../../utils/types';
import { getFeedsApi } from '../../../utils/burger-api';
import { stat } from 'fs';

type TFeeds = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null;
};

export const initialState: TFeeds = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

export const fetchGetFeed = createAsyncThunk(
  'oreder/fetchGetFeed',
  async (_, { rejectWithValue }) => {
    try {
      return await getFeedsApi();
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка при загрузке');
    }
  }
);

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // При загрузке даных
      .addCase(fetchGetFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // При успешной загрузке данных
      .addCase(
        fetchGetFeed.fulfilled,
        (
          state,
          action: PayloadAction<{
            orders: TOrder[];
            total: number;
            totalToday: number;
          }>
        ) => {
          state.loading = false;
          state.orders = action.payload.orders;
          state.total = action.payload.total;
          state.totalToday = action.payload.totalToday;
        }
      )

      // При неуспешной загрузке данных
      .addCase(fetchGetFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при загрузке';
      });
  }
});

export const getOrdersFeeds = (state: { feeds: TFeeds }) => state.feeds.orders;
export const getTotalFeeds = (state: { feeds: TFeeds }) => state.feeds.total;
export const getTotalTodayFeeds = (state: { feeds: TFeeds }) =>
  state.feeds.totalToday;
export const getFeedsLoading = (state: { feeds: TFeeds }) =>
  state.feeds.loading;
export const getFeedsError = (state: { feeds: TFeeds }) => state.feeds.error;

const feedsReducer = feedsSlice.reducer;
export default feedsReducer;
