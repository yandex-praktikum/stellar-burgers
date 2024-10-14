import { createSlice } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';

type TFeedState = {
  isLoading: boolean;
  error: null | string;
  data: TOrdersData;
}
const initialState = {
  isLoading: true,
  error: null,
  data: {
    orders: [],
    total: NaN,
    totalToday: NaN
  }
};
export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {}
});

export const {} = feedSlice.actions;
export default feedSlice.reducer;
