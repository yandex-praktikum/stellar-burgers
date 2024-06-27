import { ThunkAction, ThunkDispatch, thunk } from 'redux-thunk';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { fetchIngredients, ingredientsSlice } from '../Slices/IngrediensSlice';
import {
  constructorIngredientsReducer,
  constructorIngredientsSlice
} from '../Slices/constructorIngredientsSlice';
import { userReducer, userSlice } from '../Slices/userSlice';
import { orderBurgerSlice } from '../Slices/orderBurgerSlice';
import { feedSlice } from '../Slices/feedSlice';
import { orderSlice } from '../Slices/orderSlice';
import { userOrdersSlice } from '../Slices/userOrdersSlice';

const rootReducer = combineReducers({
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [constructorIngredientsSlice.name]: constructorIngredientsSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [orderBurgerSlice.name]: orderBurgerSlice.reducer,
  [feedSlice.name]: feedSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
  [userOrdersSlice.name]: userOrdersSlice.reducer
});
// Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
