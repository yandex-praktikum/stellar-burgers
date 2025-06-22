import { getFeedsApi } from '@api';
import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';

type TFeedsState = {
  isLoading: boolean;
  error: null | SerializedError;
  data: TOrdersData;
};

export const initialState: TFeedsState = {
  isLoading: true,
  error: null,
  data: {
    orders: [],
    total: 0,
    totalToday: 0
  }
};

export const fetchFeeds = createAsyncThunk<TOrdersData>(
  'feeds/fetch',
  async () => await getFeedsApi()
);

const slice = createSlice({
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
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
  selectors: {
    selectFeeds: (state) => state.data,
    selectFeedsOrders: (state) => state.data.orders,
    selectFeedsTotal: (state) => state.data.total,
    selectFeedsTotalToday: (state) => state.data.totalToday,
    selectFeedsIsLoading: (state) => state.isLoading
  }
});

export default slice.reducer;

export const {
  selectFeeds,
  selectFeedsOrders,
  selectFeedsTotal,
  selectFeedsTotalToday,
  selectFeedsIsLoading
} = slice.selectors;
