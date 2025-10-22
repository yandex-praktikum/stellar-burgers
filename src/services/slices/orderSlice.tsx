// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import { TOrder } from '@utils-types';
// import {
//   getFeedsApi,
//   getOrdersApi,
//   orderBurgerApi,
//   getOrderByNumberApi
// } from '../../utils/burger-api';

// interface OrderState {
//   orders: TOrder[];
//   feeds: TOrder[];
//   orderDetails: TOrder | null;
//   isLoading: boolean;
//   error: string | null;
// }

// const initialState: OrderState = {
//   orders: [],
//   feeds: [],
//   orderDetails: null,
//   isLoading: false,
//   error: null
// };

// export const fetchOrders = createAsyncThunk<TOrder[]>(
//   'order/fetchOrders',
//   async () => {
//     const order = await getOrdersApi();
//     return order;
//   }
// );

// export const fetchFeeds = createAsyncThunk<TOrder[]>(
//   'order/fetchFeeds',
//   async () => {
//     const feeds = await getFeedsApi();
//     return feeds.orders; // Возвращаем только заказы из данных feeds
//   }
// );

// export const createOrder = createAsyncThunk<TOrder, string[]>(
//   'order/createOrder',
//   async (ingredients) => {
//     const response = await orderBurgerApi(ingredients);
//     return response.order; // Используем `order` из ответа
//   }
// );

// export const fetchOrderByNumber = createAsyncThunk<TOrder, number>(
//   'order/fetchOrderByNumber',
//   async (number) => {
//     const response = await getOrderByNumberApi(number);
//     return response.orders[0]; // Извлекаем первый заказ из массива
//   }
// );

// const orderSlice = createSlice({
//   name: 'order',
//   initialState,
//   reducers: {
//     resetOrderDetails: (state) => {
//       state.orderDetails = null;
//     }
//   },
//   selectors: {
//     getUserOrders: (state: OrderState) => state.orders
//     // getStatus: (state: OrderState) => state.status
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchOrders.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(
//         fetchOrders.fulfilled,
//         (state, action: PayloadAction<TOrder[]>) => {
//           state.isLoading = false;
//           state.orders = action.payload;
//         }
//       )
//       .addCase(fetchOrders.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.error.message ?? null; // Обработка ошибки
//       })
//       .addCase(fetchFeeds.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(
//         fetchFeeds.fulfilled,
//         (state, action: PayloadAction<TOrder[]>) => {
//           state.isLoading = false;
//           state.feeds = action.payload;
//         }
//       )
//       .addCase(fetchFeeds.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.error.message ?? null;
//       })
//       .addCase(createOrder.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(
//         createOrder.fulfilled,
//         (state, action: PayloadAction<TOrder>) => {
//           state.isLoading = false;
//           state.orders.push(action.payload);
//         }
//       )
//       .addCase(createOrder.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.error.message ?? null;
//       })
//       .addCase(
//         fetchOrderByNumber.fulfilled,
//         (state, action: PayloadAction<TOrder>) => {
//           state.orderDetails = action.payload;
//         }
//       );
//   }
// });

// export const { resetOrderDetails } = orderSlice.actions;
// export default orderSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderBurgerApi, getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';

interface OrderState {
  currentOrder: TOrder | null;
  orderStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  isLoading: boolean;
}

const initialState: OrderState = {
  currentOrder: null,
  orderStatus: 'idle',
  error: null,
  isLoading: false
};

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (data: string[], { rejectWithValue }) => {
    try {
      const response = await orderBurgerApi(data);
      console.log('GLUBINA', response);
      return response.order; // Возвращаем только объект заказа
    } catch (err) {
      return rejectWithValue('Failed to create order');
    }
  }
);

export const fetchOrderByNumber = createAsyncThunk(
  'order/fetchOrderByNumber',
  async (number: number, { rejectWithValue }) => {
    try {
      const response = await getOrderByNumberApi(number);
      return response.orders[0]; // Извлекаем первый заказ
    } catch (err) {
      return rejectWithValue('Failed to fetch order');
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearCurrentOrder: (state: OrderState) => {
      state.currentOrder = null;
    }
  },
  selectors: {
    selectCurrentOrder: (state: OrderState) => state.currentOrder,
    selectOrderStatus: (state: OrderState) => state.orderStatus,
    selectOrderError: (state: OrderState) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderStatus = 'loading';
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderStatus = 'succeeded';
        state.currentOrder = action.payload;
        console.log('CREATEORDER', action.payload);
        state.isLoading = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderStatus = 'failed';
        state.error = action.payload as string;
        state.isLoading = false;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.orderStatus = 'succeeded';
        state.currentOrder = action.payload;
      });
  }
});

export const { selectCurrentOrder } = orderSlice.selectors;
export const { clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;
