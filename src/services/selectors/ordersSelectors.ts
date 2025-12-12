import { RootState } from '../store';

export const getOrders = (state: RootState) => state.orders.orders;
export const getFeed = (state: RootState) => state.orders.feed;
export const getTotal = (state: RootState) => state.orders.total;
export const getTotalToday = (state: RootState) => state.orders.totalToday;
export const getCurrentOrder = (state: RootState) => state.orders.currentOrder;
export const getOrderRequest = (state: RootState) => state.orders.orderRequest;
export const getOrderError = (state: RootState) => state.orders.orderError;
export const getOrdersLoading = (state: RootState) => state.orders.loading;
export const getOrdersError = (state: RootState) => state.orders.error;
