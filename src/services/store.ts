import { configureStore } from '@reduxjs/toolkit';

import { combineSlices, combineReducers } from '@reduxjs/toolkit';
import { ingredientSlice } from './ingredientsSlice';
import { constructorSlice } from './constructorSlice';
import { userSlice } from './userSlice';
import { feedsSlice } from './orderSlice';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  ingredientData: ingredientSlice.reducer,
  constructorBurger: constructorSlice.reducer,
  userData: userSlice.reducer,
  feedsData: feedsSlice.reducer
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
