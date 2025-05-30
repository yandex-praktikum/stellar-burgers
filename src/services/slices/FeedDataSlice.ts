import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../utils/burger-api';
import { TOrder } from '@utils-types';
import { getOrderByNumberApi } from '../../utils/burger-api';
import { act } from 'react-dom/test-utils';

export type TStateFeed = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  error: null | string;
  loading: boolean;
  modalOrder: TOrder | null;
};

const initialState: TStateFeed = {
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
  loading: false,
  modalOrder: null
};

export const getFeedData = createAsyncThunk('feed/data', getFeedsApi);

export const getOrderByNum = createAsyncThunk(
  'feed/getOrder',
  async (number: number, { rejectWithValue }) => {
    try {
      const response = await getOrderByNumberApi(number);
      return response;
    } catch (error) {
      return rejectWithValue('Error feed data');
    }
  }
);

export const feedDataSlice = createSlice({
  name: 'feeddata',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeedData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeedData.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.loading = false;
      })
      .addCase(getFeedData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Feed error';
      })
      .addCase(getOrderByNum.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderByNum.fulfilled, (state, action) => {
        state.loading = false;
        state.modalOrder = action.payload.orders[0];
      })
      .addCase(getOrderByNum.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Feed error';
      });
  },
  selectors: {
    getFeedOrders: (state) => state.orders,
    getTotalEmountOrders: (state) => state.total,
    getTotalEmountToday: (state) => state.totalToday,
    getLoading: (state) => state.loading,
    getError: (state) => state.error,
    selectModalOrder: (state) => state.modalOrder
  }
});

export default feedDataSlice;
export const {
  getFeedOrders,
  getTotalEmountOrders,
  getTotalEmountToday,
  getLoading,
  getError
} = feedDataSlice.selectors;
