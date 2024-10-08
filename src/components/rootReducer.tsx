import { combineReducers } from '@reduxjs/toolkit';
import ingredientsSlice from './ingredientsSlice';
import orderSlice from './orderSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsSlice,
  orders: orderSlice
});

export default rootReducer;
