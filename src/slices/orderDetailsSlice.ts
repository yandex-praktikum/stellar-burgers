import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient, TOrder } from '@utils-types';
import { getOrderByNumberApi } from '@api';

interface OrderDetailState {
  order: TOrder | null;
  loading: boolean;
  error: string | null;
  orderIngredients: string[];
}

const initialState: OrderDetailState = {
  order: null,
  loading: false,
  error: null,
  orderIngredients: []
};

export const getOrderDetails = createAsyncThunk(
  'orderDetail/getOrderDetails',
  async (orderId: number) => {
    const response = await getOrderByNumberApi(orderId);
    return response;
  }
);

const orderDetailsSlice = createSlice({
  name: 'orderDetail',
  initialState,
  reducers: {
    clearOrderDetails: (state) => {
      state.order = null;
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.orders[0];
        state.orderIngredients = action.payload.orders[0].ingredients;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch order';
      });
  }
});

export const { clearOrderDetails } = orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
