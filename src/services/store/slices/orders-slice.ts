import {
  getFeedsApi,
  getOrderByNumberApi,
  getOrdersApi,
  handleApiError,
  orderBurgerApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IOrdersState, TOrder, TOrdersData } from '@utils-types';

// Переменные для строковых наименований
const createOrderActionType = 'orders/createOrder';
const fetchUsersOrdersActionType = 'orders/fetchOrders';
const fetchOrderByNumberActionType = 'orders/fetchOrderByNumber';
const getFeedActionType = 'orders/getFeeds';
const ordersSliceName = 'orders';

// Начальное состояние
const initialState: IOrdersState = {
  feed: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  usersOrders: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  justCreatedOrder: null,
  selectedOrder: null,
  isLoadingSelectedOrder: false,
  isLoading: false,
  error: null
};

// Создать заказ
export const createOrder = createAsyncThunk<
  TOrder,
  string[],
  { rejectValue: string }
>(createOrderActionType, async (ingredients, { rejectWithValue }) => {
  try {
    return (await orderBurgerApi(ingredients)).order;
  } catch (error) {
    return rejectWithValue(handleApiError(error, 'Failed to create order'));
  }
});

// Получить все заказы (Feed)
export const getFeed = createAsyncThunk<
  TOrdersData,
  void,
  { rejectValue: string }
>(getFeedActionType, async (_, { rejectWithValue }) => {
  try {
    return await getFeedsApi();
  } catch (error) {
    return rejectWithValue(handleApiError(error, 'Failed to get feeds'));
  }
});

// Получить пользовательские заказы
export const getUsersOrders = createAsyncThunk<
  TOrder[],
  void,
  { rejectValue: string }
>(fetchUsersOrdersActionType, async (_, { rejectWithValue }) => {
  try {
    return await getOrdersApi();
  } catch (error) {
    return rejectWithValue(handleApiError(error, 'Failed to get users orders'));
  }
});

// Получить заказ по номеру
export const getOrder = createAsyncThunk<
  TOrder,
  number,
  { rejectValue: string }
>(fetchOrderByNumberActionType, async (orderNumber, { rejectWithValue }) => {
  try {
    // API возвращает массив, берем первый элемент
    return (await getOrderByNumberApi(orderNumber)).orders[0];
  } catch (error) {
    return rejectWithValue(
      handleApiError(error, 'Failed to get order by number')
    );
  }
});

// Слайс для заказов
const ordersSlice = createSlice({
  name: ordersSliceName,
  initialState,
  reducers: {
    // Очистить только что созданный заказ
    clearJustCreatedOrder: (state) => {
      state.justCreatedOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Создание заказа
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.justCreatedOrder = action.payload;
        state.isLoading = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })
      // Получение заказа по номеру
      .addCase(getOrder.pending, (state) => {
        state.selectedOrder = null;
        state.isLoadingSelectedOrder = true;
        state.error = null;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.selectedOrder = action.payload;
        state.isLoadingSelectedOrder = false;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoadingSelectedOrder = false;
      })
      // Получение заказов пользователя
      .addCase(getUsersOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUsersOrders.fulfilled, (state, action) => {
        state.usersOrders.orders = action.payload;
        state.isLoading = false;
      })
      .addCase(getUsersOrders.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })
      // Получение всех заказов (Feed)
      .addCase(getFeed.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.feed.orders = action.payload.orders;
        state.feed.total = action.payload.total;
        state.feed.totalToday = action.payload.totalToday;
        state.isLoading = false;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      });
  }
});

export const { clearJustCreatedOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
