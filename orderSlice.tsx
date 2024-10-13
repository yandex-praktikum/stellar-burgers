import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient, TOrder } from '@utils-types';
import { env } from 'process';

//начальное состояние
interface OrderState {
  orders: TOrder[];
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  ingredients: [],
  orders: [],
  loading: false,
  error: null
};

//асинхронное действие для получения заказов
export const fetchOrders = createAsyncThunk('order/fetchOrders', async () => {
  const response = await fetch('BURGER_API_URL');
  if (!response.ok) {
    throw new Error('Ошибка при получении заказов');
  }
  const data = await response.json();
  return data.orders;
});

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      state.ingredients.push(action.payload);
    },
    removeIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient._id !== action.payload
      );
    },
    clearOrder: (state) => {
      state.ingredients = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Неизвестная ошибка';
      });
  }
});

//экспорт действия и редьюсер
export const { addIngredient, removeIngredient, clearOrder } =
  orderSlice.actions;
export default orderSlice.reducer;
