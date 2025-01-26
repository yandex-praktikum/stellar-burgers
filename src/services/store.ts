import { combineReducers, configureStore } from '@reduxjs/toolkit';
import constructorReducer from './constructorSlice';
import ingredientsReducer from './ingredientSlice';
import userReducer from './userSlice';
import orderReducer from './orderSlice';
import feedReducer from './feedSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  feed: feedReducer,
  constructorSlice: constructorReducer,
  order: orderReducer,
  user: userReducer
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
