import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TInitialState = {
  orders: TOrder[];
};

const initialState: TInitialState = {
  orders: []
};

export const getUserOrdersThunk = createAsyncThunk('user/getOrders', async () =>
  getOrdersApi()
);

export const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {},
  selectors: {
    selectUserOrders: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder.addCase(getUserOrdersThunk.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  }
});

export const userOrdersReducer = userOrdersSlice.reducer;
export const { selectUserOrders } = userOrdersSlice.selectors;
