import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types'; // Предполагается, что TFeedInfo определен в utils-types
import { getFeedsApi, getOrdersApi } from '@api'; // Предполагается, что этот API существует

type TFeedInfoSliceState = {
  orders: TOrder[]; // Для хранения информации о заказах
  isLoading: boolean;
  error: string | null;
  feed: {
    total: number;
    totalToday: number;
  };
};

export const initialState: TFeedInfoSliceState = {
  orders: [],
  isLoading: false,
  error: null,
  feed: {
    total: 0,
    totalToday: 0
  }
};

// Асинхронный thunk для получения информации о заказах
export const fetchFeeds = createAsyncThunk('orders/get', async () => {
  const response = getFeedsApi();
  return response;
});

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        // Когда запрос в ожидании
        state.isLoading = true; // Устанавливаем состояние загрузки в true
        state.error = null; // Очищаем любые существующие ошибки
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        // Когда запрос выполнен успешно
        state.feed.total = action.payload.total; // Сохранение информации о заказах
        state.isLoading = false;
        state.orders = action.payload.orders;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        // Когда запрос завершился неудачей
        state.isLoading = false;
        state.error = action.error.message as string;
      });
  },
  selectors: {
    selectOrders: (state) => state.orders, // Селектор для получения заказов из состояния
    selectFeed: (state) => state.feed // Селектор для получения статистики фида из состояния
  }
});
export default feedSlice.reducer;
export const { selectOrders, selectFeed } = feedSlice.selectors;
