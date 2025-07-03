import { configureStore, combineReducers } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import ingredientsReducer from './slices/ingredientsSlice';
import orderReducer from './slices/orderSlice';
import constructorReducer from './slices/constructorSlice';
import userReducer from './slices/userSlice';
import ordersReducer from './slices/orders';
import feedReducer from './slices/feed';

const rootReducer = combineReducers({
  user: userReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
  orders: ordersReducer,
  feed: feedReducer,
  constructorBurger: constructorReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
