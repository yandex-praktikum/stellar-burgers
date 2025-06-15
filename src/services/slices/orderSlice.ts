import { orderBurgerApi, TNewOrderResponse } from '../../utils/burger-api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { constructorState } from './constructorSlice';

type orderState = {
  orderRequest: boolean;
  orderIngredients: string[];
  orderData: TOrder | null;
  error: null | string;
};

const initialState: orderState = {
  orderRequest: false,
  orderIngredients: [],
  orderData: null,
  error: null
};

export const fetchOrderBurger = createAsyncThunk(
  'orderSlice/fetchOrderBurger',
  async (data: string[]) => orderBurgerApi(data)
);

const orderSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {
    createOrder: (state, action: PayloadAction<constructorState>) => {
      state.orderIngredients = action.payload.ingredients.map(
        (ingredient) => ingredient._id
      );

      if (action.payload.bun) {
        state.orderIngredients.push(action.payload.bun?._id);
        state.orderIngredients.unshift(action.payload.bun?._id);
      }
    },
    clearOrderData: (state) => {
      state.orderData = null;
      state.orderIngredients = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderBurger.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(
        fetchOrderBurger.fulfilled,
        (state, action: PayloadAction<TNewOrderResponse>) => {
          state.orderRequest = false;
          state.orderData = action.payload.order;
        }
      )
      .addCase(fetchOrderBurger.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message!;
      });
  }
});

export const { createOrder, clearOrderData } = orderSlice.actions;

export default orderSlice;
