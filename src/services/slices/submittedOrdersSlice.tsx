import { TOrder } from '@utils-types';
import { getOrdersApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSubmitOrders = createAsyncThunk(
  'SubmitOrders/get',
  async () => getOrdersApi()
);

export type TSubmittedOrdersSlice = {
  orders: TOrder[];
  fetchingStatus: boolean;
  error: null | string;
};

export const initialState: TSubmittedOrdersSlice = {
  orders: [],
  fetchingStatus: false,
  error: null
};

export const submittedOrdersSlice = createSlice({
  name: 'submittedOrders',
  initialState,
  reducers: {},
  selectors: {
    selectSubmittedOrders: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubmitOrders.pending, (state) => {
        state.fetchingStatus = true;
        state.orders = [];
        state.error = null;
      })
      .addCase(fetchSubmitOrders.rejected, (state, action) => {
        state.fetchingStatus = false;
        state.error = action.error.message as string;
      })
      .addCase(fetchSubmitOrders.fulfilled, (state, action) => {
        state.fetchingStatus = false;
        state.orders = action.payload;
      });
  }
});
export default submittedOrdersSlice.reducer;
export const { selectSubmittedOrders } = submittedOrdersSlice.selectors;
