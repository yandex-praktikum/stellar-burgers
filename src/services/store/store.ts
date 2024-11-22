import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  constructorReducer,
  ingredientsReducer,
  ordersReducer,
  userReducer
} from '@slices';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  ingredientsState: ingredientsReducer,
  burgerConstructorState: constructorReducer,
  userState: userReducer,
  ordersState: ordersReducer
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
