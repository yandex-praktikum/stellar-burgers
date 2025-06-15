import { combineSlices } from '@reduxjs/toolkit';
import ingredientsSlice from './slices/ingredientsSlice';
import consctructorSlice from './slices/constructorSlice';
import ordersSlice from './slices/ordersSlice';
import userSlice from './slices/userSlice';
import orderSlice from './slices/orderSlice';

const rootReducer = combineSlices(
  consctructorSlice,
  ingredientsSlice,
  ordersSlice,
  userSlice,
  orderSlice
);

export default rootReducer;
