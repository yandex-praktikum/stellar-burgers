import { configureStore } from '@reduxjs/toolkit';
import builderReducer from '../slices/builder-slice';
import feedReducer from '../slices/feed-slice';
import ingredientsReducer from '../slices/ingredients-slice';
import orderReducer from '../slices/order-slice';
import userReducer from '../slices/user-slice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = {
  builder: builderReducer,
  feed: feedReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
  user: userReducer
}; // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
