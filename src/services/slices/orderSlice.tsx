import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../../utils/burger-api';
import { TOrder } from '@utils-types';
import { clearConstructor } from './constructorSlice';

interface OrderState {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null | undefined;
}

const initialState: OrderState = {
  orderRequest: false,
  orderModalData: null,
  error: undefined
};

export const placeOrder = createAsyncThunk(
  'order/placeOrder',
  async (ingredients: string[], { dispatch, rejectWithValue }) => {
    try {
      const response = await orderBurgerApi(ingredients);
      dispatch(clearConstructor());
      return response;
    } catch (error) {
      return rejectWithValue('Не удалось создать заказ. Попробуйте снова.');
    }
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderState: (state) => {
      state.orderRequest = false;
      state.orderModalData = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
        state.error = null;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.payload as string;
      });
  },

  selectors: {
    getOrderRequest: (state) => state.orderRequest,
    getOrderModalData: (state) => state.orderModalData
  }
});
export const { clearOrderState } = orderSlice.actions;
export const { getOrderRequest, getOrderModalData } = orderSlice.selectors;
function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}
