import { feedsReducer } from './slices/slice-feed';
import { configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsReducer } from './slices/slice-Ingridients';
import { constructorReducer } from './slices/slice-constructor';
import { authReducer } from './slices/slice-auth';
import { profileOrdersReducer } from './slices/slice-profile-orders';
import { orderReducer } from './slices/slice-order';

const rootReducer = {
  ingredients: ingredientsReducer,
  feeds: feedsReducer,
  burgerConstructor: constructorReducer,
  auth: authReducer,
  profileOrders: profileOrdersReducer,
  order: orderReducer
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
