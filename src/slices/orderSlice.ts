import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice, isPending } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TInitialState = {
  isPending: boolean;
  name: string | '';
  order: TOrder | null;
};

const initialState: TInitialState = {
  isPending: false,
  name: '',
  order: null
};

export const placeOrder = createAsyncThunk(
  'order/placeOrder',
  async (ingredients: string[]) => {
    const order = await orderBurgerApi(ingredients);
    return order;
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
      state.name = '';
      state.isPending = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.isPending = true;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.isPending = false;
        state.name = action.payload.name;
        state.order = action.payload.order;
      })
      .addCase(placeOrder.rejected, (state) => {
        state.isPending = false;
      });
  }
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
