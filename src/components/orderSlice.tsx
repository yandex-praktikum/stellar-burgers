import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '../utils/burger-api'; // Импортируйте API
import { TOrder } from '../utils/types'; // Импортируйте TOrder

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const response = await getOrdersApi();
  return response;
});

// Обновите интерфейс состояния
interface OrdersState {
  items: TOrder[];
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  items: [],
  loading: false,
  error: null
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true; // Устанавливаем лоадер
        state.error = null; // Обнуляем ошибку при новом запросе
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false; // Скрываем лоадер
        state.items = action.payload; // Сохраняем данные
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false; // Скрываем лоадер
        state.error = action.error.message
          ? action.error.message
          : 'Unknown error'; // Проверяем наличие сообщения об ошибке
      });
  }
});

export default ordersSlice.reducer;
