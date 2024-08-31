import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import ingredientsReducer from './ingredientsSlice';
import orderReducer from './ordersSlice';
import feedsReducer from './feedSlice';
import constructorSlice from './constructorSlice';
import authSlice from './authSlice';

// const rootReducer = () => {}; // Заменить на импорт настоящего редьюсера
const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  orders: orderReducer,
  feeds: feedsReducer,
  burger: constructorSlice,
  auth: authSlice
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
