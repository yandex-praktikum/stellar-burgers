import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TInitialState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

const initialState: TInitialState = {
  orders: [],
  total: 0,
  totalToday: 0
};

export const getFeedThunk = createAsyncThunk(
  'feed/getAll',
  async (_, { dispatch }) => {
    dispatch(clearFeed());
    const data = await getFeedsApi();
    return data;
  }
);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    clearFeed: () => initialState
  },
  selectors: {
    selectFeed: (state) => state.orders,
    selectTotal: (state) => state.total,
    selectTotalToday: (state) => state.totalToday,
    selectData: (state) => state
  },
  extraReducers: (builder) => {
    builder.addCase(getFeedThunk.fulfilled, (state, action) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    });
  }
});

export const feedReducer = feedSlice.reducer;
export const { selectFeed, selectTotal, selectTotalToday, selectData } =
  feedSlice.selectors;
export const { clearFeed } = feedSlice.actions;
