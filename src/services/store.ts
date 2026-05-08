import { configureStore, combineSlices } from '@reduxjs/toolkit';

import {
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsSlice } from './ingredients/ingredientsSlice';
import { constructorSlice } from './constructor/constructorSlice';
import { orderSlice } from './order/orderSlice';
import { userSlice } from './user/userSlice';
import { feedSlice } from './feed/feedSlice';
import { userOrdersSlice } from './users-orders/userOrderSlice';

export const rootReducer = combineSlices({
  ingredients: ingredientsSlice.reducer,
  burgerConstructor: constructorSlice.reducer,
  order: orderSlice.reducer,
  user: userSlice.reducer,
  feed: feedSlice.reducer,
  userOrders: userOrdersSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();

export default store;
