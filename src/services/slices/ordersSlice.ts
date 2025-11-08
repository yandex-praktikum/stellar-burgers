import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  orderBurgerApi,
  getOrdersApi,
  getFeedsApi,
  getOrderByNumberApi
} from '@api';
import { TOrder } from '@utils-types';

export interface OrdersState {
  orders: TOrder[];
  feed: TOrder[];
  total: number;
  totalToday: number;
  currentOrder: TOrder | null;
  orderRequest: boolean;
  orderError: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  feed: [],
  total: 0,
  totalToday: 0,
  currentOrder: null,
  orderRequest: false,
  orderError: null,
  loading: false,
  error: null
};

// Thunk для создания заказа
export const createOrder = createAsyncThunk(
  'orders/create',
  async (ingredients: string[], { rejectWithValue }) => {
    try {
      const data = await orderBurgerApi(ingredients);
      return data.order;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Ошибка создания заказа'
      );
    }
  }
);

// Thunk для получения заказов пользователя
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const orders = await getOrdersApi();
      return orders;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Ошибка загрузки заказов'
      );
    }
  }
);

// Thunk для получения ленты заказов
export const fetchFeeds = createAsyncThunk(
  'orders/fetchFeeds',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getFeedsApi();
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Ошибка загрузки ленты заказов'
      );
    }
  }
);

// Thunk для получения заказа по номеру
export const fetchOrderByNumber = createAsyncThunk(
  'orders/fetchByNumber',
  async (number: number, { rejectWithValue }) => {
    try {
      const data = await getOrderByNumberApi(number);
      if (data.success && data.orders.length > 0) {
        return data.orders[0];
      }
      return rejectWithValue('Заказ не найден');
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Ошибка загрузки заказа'
      );
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    clearOrderError: (state) => {
      state.orderError = null;
    }
  },
  extraReducers: (builder) => {
    // createOrder
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.orderError = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
        state.orderRequest = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.orderError = action.payload as string;
      });

    // fetchOrders
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // fetchFeeds
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.feed = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.loading = false;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // fetchOrderByNumber
    builder
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { clearCurrentOrder, clearOrderError } = ordersSlice.actions;
export default ordersSlice.reducer;
