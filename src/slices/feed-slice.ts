import { TOrdersData } from '@utils-types';
import { getFeedsApi } from '@api';
import {
  createSlice,
  createAsyncThunk,
  SerializedError,
  createSelector
} from '@reduxjs/toolkit';
import { RootState } from '../services/store';

export interface FeedState {
  items: TOrdersData | null;
  loading: boolean;
  error: SerializedError | null;
}

export const initialState: FeedState = {
  items: null,
  loading: false,
  error: null
};

export const feedThunk = createAsyncThunk(
  'feed/fetch',
  async () => await getFeedsApi()
);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(feedThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(feedThunk.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(feedThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  }
});

export const selectFeed = (state: RootState) => state.feed.items;
export const selectLoading = (state: RootState) => state.feed.loading;
export const selectError = (state: RootState) => state.feed.error;
export const selectOrders = createSelector(
  [selectFeed],
  (feed) => feed?.orders || []
);

export default feedSlice.reducer;
