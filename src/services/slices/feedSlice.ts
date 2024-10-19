import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';

export const getFeeds = createAsyncThunk<any>(
  'feed/getFeeds',
  async (): Promise<any> => await getFeedsApi()
);

type TFeedState = {
  isLoading: boolean;
  error: null | string;
  data: TOrdersData;
};
const initialState: TFeedState = {
  isLoading: true,
  error: null,
  data: {
    orders: [],
    total: NaN,
    totalToday: NaN
  }
};
export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state: any, action: any) => {
        console.log('loading');
      })
      .addCase(getFeeds.fulfilled, (state: any, action: any) => {
        console.log('done');
        state.isLoading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(getFeeds.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.error = action.error;
      });
  }
});

export const {} = feedSlice.actions;
export default feedSlice.reducer;
