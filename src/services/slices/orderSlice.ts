import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../../utils/burger-api';
import { TOrder } from '@utils-types';

export const postOrder = createAsyncThunk(
  'order/postOrder',
  async (data: string[]) => {
    const res = await orderBurgerApi(data);
    return res.order;
  }
);

interface OrderState {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null;
}

const initialState: OrderState = {
  orderRequest: false,
  orderModalData: null,
  error: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderModal: (state) => {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload as unknown as TOrder;
      })
      .addCase(postOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message || 'Ошибка';
      });
  }
});

export const { clearOrderModal } = orderSlice.actions;
export default orderSlice.reducer;
