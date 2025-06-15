import { RootState } from './store';

export const selectFeedState = (state: RootState) => state.orders;
export const selectOrder = (state: RootState) => state.orders.selectedOrder;
export const selectOrders = (state: RootState) => state.orders.orders;
export const selectFeeds = (state: RootState) => state.orders.feeds;

export const selectIngredients = (state: RootState) =>
  state.ingredients.ingredients;
export const selectIngredientsLoadingStatus = (state: RootState) =>
  state.ingredients.isLoading;

export const selectConstructorIems = (state: RootState) =>
  state.constructorSlice;

export const selectOrderRequest = (state: RootState) =>
  state.orderSlice.orderRequest;
export const selectOrderData = (state: RootState) => state.orderSlice.orderData;

export const selectUser = (state: RootState) => state.user.user;
export const selectUserProgressCheck = (state: RootState) =>
  state.user.isUserCheckInProgress;
export const selectError = (state: RootState) => state.user.error;

export const selectOrderIngredients = (state: RootState) =>
  state.orderSlice.orderIngredients;
