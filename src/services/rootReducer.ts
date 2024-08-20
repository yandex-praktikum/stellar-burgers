import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from './slices/ingredientsSlice';
import { constructorReducer } from './slices/constructorSlice';
import { userReducer } from './slices/userSlice';
import { newOrderReducer } from './slices/newOrderSlice';
import { userOrdersReducer } from './slices/userOrdersSlice';
import { feedsReducer } from './slices/feedsSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorBurger: constructorReducer,
  user: userReducer,
  newOrder: newOrderReducer,
  orders: userOrdersReducer,
  feeds: feedsReducer
});
