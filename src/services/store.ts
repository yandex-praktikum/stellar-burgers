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

const rootReducer = combineReducers({
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [constructorIngredientsSlice.name]: constructorIngredientsSlice.reducer
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
