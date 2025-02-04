import {
  createSlice,
  createAsyncThunk,
  SerializedError
} from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';
import {
  TNewOrderResponse,
  orderBurgerApi,
  getOrderByNumberApi,
  getOrdersApi
} from '@api';

interface IOrderState {
  order: TOrder[];
  orderRequest: boolean;
  orderError: null | SerializedError;
  orderModalData: TOrder | null;
  isLoadingNumber: boolean;
  isLoadingOrder: boolean;
}

const initialState: IOrderState = {
  order: [],
  orderRequest: false,
  orderError: null,
  orderModalData: null,
  isLoadingNumber: true,
  isLoadingOrder: true
};

// Создание Thunk-функции для создания заказа
export const createOrder = createAsyncThunk<
  {
    order: TOrder;
    name: string;
  },
  string[]
>('order/createOrder', async (ingredients, { rejectWithValue }) => {
  try {
    const response = await orderBurgerApi(ingredients);
    return response;
  } catch (error) {
    return rejectWithValue(
      (error as { message?: string }).message || 'Ошибка создания заказа'
    );
  }
});

export const fetchOrderNumber = createAsyncThunk<TOrder, number>(
  'orders/fetchOrder',
  async (data, { rejectWithValue }) => {
    const response = await getOrderByNumberApi(data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response.orders[0];
  }
);

export const fetchOrder = createAsyncThunk(
  'orders/fetchOrders',
  async () => await getOrdersApi()
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    /*
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
    }*/
    clearOrderModalData(state) {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderNumber.pending, (state) => {
        state.isLoadingNumber = true;
      })
      .addCase(fetchOrderNumber.fulfilled, (state, action) => {
        state.isLoadingNumber = false;
        state.orderModalData = action.payload;
      })
      .addCase(fetchOrderNumber.rejected, (state) => {
        state.isLoadingNumber = false;
      })
      .addCase(fetchOrder.pending, (state) => {
        state.isLoadingOrder = true;
        state.orderError = null;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.isLoadingOrder = false;
        state.orderError = null;
        state.order = action.payload;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.isLoadingOrder = false;
        state.orderError = action.error;
      })
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
      });
  }
});

// Получаю состояние заказа
/*const selectOrderState = (state: { order: IOrderState }): IOrderState =>
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
} = orderSlice.actions;*/

export const selectOrders = (state: { order: IOrderState }): TOrder[] =>
  state.order.order;
export const selectOrderRequest = (state: { order: IOrderState }) =>
  state.order.orderRequest;
export const selectOrderModalData = (state: { order: IOrderState }) =>
  state.order.orderModalData;

export const { clearOrderModalData } = orderSlice.actions;

// Экспортирую редьюсер
export default orderSlice.reducer;
