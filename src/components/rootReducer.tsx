import { combineReducers } from '@reduxjs/toolkit';
import ingredientsSlice from './ingredientsSlice';
import { feedSlice } from './feedSlice';
import newOrderSlice from './newOrder';
import userSlice from './userSlice';
import orderSlice from './orderSlice';
import ordersListSlice from './ordersListSlice';

const rootReducer = combineReducers({
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [feedSlice.name]: feedSlice.reducer,
  [newOrderSlice.name]: newOrderSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
  [ordersListSlice.name]: ordersListSlice.reducer
});

export default rootReducer;
