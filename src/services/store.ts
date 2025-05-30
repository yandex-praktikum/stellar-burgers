import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import ingredientsSlice from './slices/IngredientsSlice';
import burgerConstructorSlice from './slices/BurgerConstructorSlice';
import userStateSlice from './slices/UserInfoSlice';
import feedDataSlice from './slices/FeedDataSlice';
import userOrdersHistorySlice from './slices/UserOrdersHistory';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

// Комбинируем все слайсы в один корневой редьюсер
const rootReducer = combineReducers({
  [burgerConstructorSlice.name]: burgerConstructorSlice.reducer,
  [feedDataSlice.name]: feedDataSlice.reducer,
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [userStateSlice.name]: userStateSlice.reducer,
  [userOrdersHistorySlice.name]: userOrdersHistorySlice.reducer
});

export { rootReducer };

// Создаем Redux-хранилище с использованием корневого редьюсера
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// Создаем собственные хуки для использования dispatch и selector с типизацией
export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
