import { configureStore } from '@reduxjs/toolkit';
import burgerReducer from '../slices/burgerSlice';
import constructorReducer from '../slices/constructorSlice';
import ingredientsReducer from '../slices/ingredientsListSlice';
import orderSlice from '../slices/orderSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = {
  burger: burgerReducer,
  constructor: constructorReducer,
  ingredients: ingredientsReducer,
  order: orderSlice
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
