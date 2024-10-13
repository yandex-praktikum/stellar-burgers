import { combineReducers } from '@reduxjs/toolkit';
import ingredientsSlice from './ingredientsSlice';
import { feedSlice } from './feedSlice';
import newOrderSlice from './newOrder';
import userSlice from './userSlice';
import orderSlice from './orderSlice';
import ordersListSlice from './ordersListSlice';

// Новый rootReducer с использованием имен слайсов
const rootReducer = combineReducers({
  [ingredientsSlice.name]: ingredientsSlice.reducer, // Используем name из ingredientsSlice
  [feedSlice.name]: feedSlice.reducer, // Используем name из feedSlice
  [newOrderSlice.name]: newOrderSlice.reducer, // Используем name из newOrderSlice
  [userSlice.name]: userSlice.reducer, // Используем name из userSlice
  [orderSlice.name]: orderSlice.reducer, // Используем name из orderSlice
  [ordersListSlice.name]: ordersListSlice.reducer // Используем name из ordersListSlice
});

export default rootReducer;
