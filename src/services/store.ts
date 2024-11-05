import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import userReducer from './slices/user/user';
import ingredientReducer from './slices/ingredients/ingredients';
import cartReducer from './slices/burger-cart/burger-cart';
import newOrderRequest from './slices/order/new-order';
import orderListReducer from './slices/order/order-list';
import feedsReducer from './slices/feeds/feeds';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  user: userReducer,
  ingredients: ingredientReducer,
  cart: cartReducer,
  newOrder: newOrderRequest,
  orderList: orderListReducer,
  feeds: feedsReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
