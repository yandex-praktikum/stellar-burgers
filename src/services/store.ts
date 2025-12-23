import { combineReducers, configureStore } from '@reduxjs/toolkit';
import builderReducer from '../slices/builderSlice';
import ingredientsReducer from '../slices/ingredientsListSlice';
import orderReducer from '../slices/orderSlice';
import userReducer from '../slices/userSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { feedReducer } from '../slices/feedSlice';

const rootReducer = combineReducers({
  builder: builderReducer,
  feed: feedReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
  user: userReducer
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
