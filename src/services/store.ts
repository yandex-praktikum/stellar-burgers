import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import burgerAssembler from './slices/burgetAssemblerSlice';
import ingredients from './slices/ingredientsSlice';
import feeds from './slices/feedSlice';
import order from './slices/orderSlice';
import user from './slices/userSlice';

const rootReducer = combineReducers({
  burgerAssembler,
  ingredients,
  feeds,
  order,
  user
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
