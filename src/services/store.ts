import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientReducer } from './slices/ingredients';
import { feedReducer } from './slices/feed';
import { userReducer } from './slices/userData';
import { orderReducer } from './slices/order';
import { burgerConstructorReducer } from './slices/burgerConstructor';
import { profileOrdersReducer } from './slices/profileOrders';

const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  ingredients: ingredientReducer,
  feed: feedReducer,
  user: userReducer,
  order: orderReducer,
  profileOrders: profileOrdersReducer
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
