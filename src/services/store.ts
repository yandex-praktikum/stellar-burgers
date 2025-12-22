import { configureStore } from '@reduxjs/toolkit';
import { burgerSlice } from './slices/BurgerSlice';
import { feedReducer } from './slices/FeedSlice';
import { authReducer } from './slices/AuthSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const store = configureStore({
  reducer: {
    burger: burgerSlice.reducer,
    feed: feedReducer,
    auth: authReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = () => dispatchHook();
export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
