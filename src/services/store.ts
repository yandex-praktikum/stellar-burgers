import { configureStore } from '@reduxjs/toolkit';
import burgerConstructorReducer from './burgerConstructorSlice/slice';
import userReducer from './userSlice/slice';
import ordersReducer from './ordersSlice/slice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const store = configureStore({
  reducer: {
    ingredients: burgerConstructorReducer,
    user: userReducer,
    orders: ordersReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
