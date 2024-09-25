import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { ingredientsSlice } from './slices/ingredients';
import { feedsSlice } from './slices/feeds';
import { newOrderSlice } from './slices/newOrder';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { constructorSlice } from './slices/constructor';
import { userSlice } from './slices/user';
import { userOrdersSlice } from './slices/userOrders';

const store = configureStore({
  reducer: {
    [ingredientsSlice.name]: ingredientsSlice.reducer,
    [constructorSlice.name]: constructorSlice.reducer,
    [userSlice.name]: userSlice.reducer,
    [feedsSlice.name]: feedsSlice.reducer,
    [newOrderSlice.name]: newOrderSlice.reducer,
    [userOrdersSlice.name]: userOrdersSlice.reducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export default store;
