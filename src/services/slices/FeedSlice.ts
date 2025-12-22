import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getFeedsApi, getOrdersApi } from '@api';
import { TOrder, TOrdersData } from '@utils-types';

export type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null;
};

export const fetchFeeds = createAsyncThunk<
  TOrdersData,
  void,
  { rejectValue: string }
>('feed/fetchFeeds', async (_, thunkAPI) => {
  try {
    const response = await getFeedsApi();
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to fetch feeds');
  }
});

export const fetchOrders = createAsyncThunk<
  TOrder[],
  void,
  { rejectValue: string }
>('feed/fetchOrders', async (_, thunkAPI) => {
  try {
    const response = await getOrdersApi();
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to fetch orders');
  }
});

const feedInitialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState: feedInitialState,
  reducers: {
    setOrders(state, action: PayloadAction<TOrder[]>) {
      state.orders = action.payload;
    },
    setTotal(state, action: PayloadAction<number>) {
      state.total = action.payload;
    },
    setTotalToday(state, action: PayloadAction<number>) {
      state.totalToday = action.payload;
    },
    clearFeed(state) {
      state.orders = [];
      state.total = 0;
      state.totalToday = 0;
    },
    updateOrderStatus(
      state,
      action: PayloadAction<{ orderId: string; status: string }>
    ) {
      const { orderId, status } = action.payload;
      const orderIndex = state.orders.findIndex(
        (order: TOrder) => order._id === orderId
      );
      if (orderIndex !== -1) {
        state.orders[orderIndex].status = status;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
      })
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
      });
  }
});

export const {
  setOrders,
  setTotal,
  setTotalToday,
  clearFeed,
  updateOrderStatus
} = feedSlice.actions;

export const feedReducer = feedSlice.reducer;
