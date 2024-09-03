import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersApi } from '@api';

type TOrdersSliceState = {
  items: TOrder[];
  isLoading: boolean;
  error: string | null;
};
export const initialState: TOrdersSliceState = {
  items: [],
  isLoading: false,
  error: null
};
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const response = await getOrdersApi();
  return response;
});
export const ordersSlice = createSlice({
  name: 'orders',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      });
  },
  selectors: {
    selectOrders: (state) => state.items,
    selectIsLoading: (state) => state.isLoading
  }
});
export default ordersSlice.reducer;
export const { selectOrders, selectIsLoading } = ordersSlice.selectors;
