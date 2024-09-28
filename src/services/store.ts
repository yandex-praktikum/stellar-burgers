import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { burgerConstructorReducer } from './slices/constructorSlice';
import { ingredientsSliceReducer } from './slices/ingredientsSlice';
import { feedsReducer } from './slices/feedsSlice';
import { userReducer } from './slices/userSlice';
import { userOrdersReducer } from './slices/userOrdersSlice';
import { newOrderReducer } from './slices/newOrderSlice';

export const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  ingredients: ingredientsSliceReducer,
  feeds: feedsReducer,
  user: userReducer,
  userOrders: userOrdersReducer,
  newOrder: newOrderReducer
}); // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
