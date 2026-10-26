import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getFeedsApi } from '../../utils/burger-api';

import type { TFeedState } from '../../utils/types';

export const fetchFeeds = createAsyncThunk('feeds/fetchAll', async () => {
  const data = await getFeedsApi();
  console.log('getFeedsApi');
  console.log(data);
  return data;
});

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null,
};

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка загрузки ленты заказов';
      });
  },
});

export default feedsSlice.reducer;
