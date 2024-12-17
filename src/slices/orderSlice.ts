import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';
import { TNewOrderResponse, orderBurgerApi } from '@api';

interface IOrderState {
  order: TOrder | null;
  orderRequest: boolean;
  orderError: boolean;
  errorMessage: string;
}

const initialState: IOrderState = {
  order: null,
  orderRequest: false,
  orderError: false,
  errorMessage: ''
};

// Создание Thunk-функции для создания заказа
export const createOrder = createAsyncThunk<
  TNewOrderResponse,
  { ingredients: string[] },
  { rejectValue: string }
>('order/createOrder', async ({ ingredients }, { rejectWithValue }) => {
  try {
    const response = await orderBurgerApi(ingredients);
    return response;
  } catch (error) {
    return rejectWithValue(
      (error as { message?: string }).message || 'Ошибка создания заказа'
    );
  }
});

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    loadOrderRequest(state) {
      state.orderRequest = true;
      state.orderError = false;
    },
    loadOrderSuccess(state, action: PayloadAction<TOrder>) {
      state.orderRequest = false;
      state.orderError = false;
      state.order = action.payload;
    },
    loadOrderError(state, action: PayloadAction<string>) {
      state.orderRequest = false;
      state.orderError = true;
      state.errorMessage = action.payload;
    },
    clearOrderDetails(state) {
      state.orderRequest = false;
      state.orderError = false;
      state.order = null;
      state.errorMessage = '';
    }
  }
});

// Получаю состояние заказа
const selectOrderState = (state: { order: IOrderState }): IOrderState =>
  state.order;

// Селекторы для получения отдельных значений состояния заказа
export const selectOrder = (state: { order: IOrderState }) =>
  selectOrderState(state).order;
export const selectOrderRequest = (state: { order: IOrderState }) =>
  selectOrderState(state).orderRequest;
export const selectOrderError = (state: { order: IOrderState }) =>
  selectOrderState(state).orderError;
export const selectOrderErrorMessage = (state: { order: IOrderState }) =>
  selectOrderState(state).errorMessage;

// Экспортирую экшены
export const {
  loadOrderRequest,
  loadOrderSuccess,
  loadOrderError,
  clearOrderDetails
} = orderSlice.actions;

// Экспортирую редьюсер
export default orderSlice.reducer;
