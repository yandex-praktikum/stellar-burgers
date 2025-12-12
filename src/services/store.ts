import { configureStore } from '@reduxjs/toolkit';
import { burgerSlice, feedSlice } from './slices/BurgerSlice';
import { authReducer } from './slices/AuthSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const store = configureStore({
  reducer: {
    burger: burgerSlice.reducer,
    feed: feedSlice.reducer,
    auth: authReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = () => dispatchHook();
export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
