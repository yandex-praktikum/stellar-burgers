import { combineSlices } from '@reduxjs/toolkit';
import { feedSlice } from '../slices/feedSlice';
import { ingredientsSlice } from '../slices/ingredientsSlice';
import { ordersSlice } from '../slices/ordersHistorySlice';
import { submittedOrdersSlice } from '../slices/activeOrdersSlice';
import { burgerConstructorSlice } from '../slices/burgerConstructorSlice';
import { profileSlice } from '../slices/profileUserSlice';
export const rootReducer = combineSlices(
  ingredientsSlice,
  burgerConstructorSlice,
  ordersSlice,
  feedSlice,
  profileSlice,
  submittedOrdersSlice
);
