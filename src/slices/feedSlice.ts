import { TOrdersData } from '@utils-types';
import { getFeedsApi } from '@api';
import {
  createSlice,
  createAsyncThunk,
  SerializedError
} from '@reduxjs/toolkit';

interface FeedState {
  feed: TOrdersData | null;
  loading: boolean;
  error: SerializedError | null;
}

const initialState: FeedState = {
  feed: null,
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
        state.loading = false;
        state.error = null;
        state.feed = action.payload;
      })
      .addCase(feedThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  }
});

export const selectFeed = (state: { feed: FeedState }) => state.feed.feed;

// Селектор для получения состояния загрузки
export const selectLoading = (state: { feed: FeedState }) => state.feed.loading;

// Селектор для получения ошибки
export const selectError = (state: { feed: FeedState }) => state.feed.error;

// Селектор для получения всех заказов
export const selectOrders = (state: { feed: FeedState }) =>
  state.feed.feed ? state.feed?.feed?.orders : [];

// Селектор для получения конкретного заказа по ID
export const selectOrderById = (
  state: { feed: FeedState },
  orderId: string
) => {
  if (state.feed.feed) {
    return (
      state.feed.feed.orders.find((order) => order._id === orderId) || null
    ); // Возвращает заказ по ID или null
  }
  return null; // Если feed отсутствует, возвращаем null
};

export const feedReducer = feedSlice.reducer;
