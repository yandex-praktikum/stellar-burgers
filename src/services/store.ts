import { combineReducers, configureStore } from '@reduxjs/toolkit';
import burgerReducer from './slices/burgerSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

// const rootReducer = combineReducers({
//   burger: burgerSlice.reducer
// }); // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: {
    burgerSlice: burgerReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof burgerReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
