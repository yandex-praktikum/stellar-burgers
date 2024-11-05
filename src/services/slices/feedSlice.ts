import { getFeedsApi } from '../../utils/burger-api';
import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';

export const getFeeds = createAsyncThunk<TOrdersData>(
  'feed/getFeeds',
  async (): Promise<TOrdersData> => await getFeedsApi()
);

type TFeedState = {
  isLoading: boolean;
  error: null | SerializedError;
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
      .addCase(getFeeds.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  }
});

export const {} = feedSlice.actions;
export default feedSlice.reducer;
