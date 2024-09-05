import { combineSlices } from '@reduxjs/toolkit';
import { feedSlice } from '../slices/feedInfoSlice';
import { ingredientsSlice } from '../../services/slices/ingredientsSlice';
import { ordersSlice } from '../../services/slices/ordersSlice';
import { profileSlice } from '../slices/profileSlice';
import { submittedOrdersSlice } from '../slices/submittedOrdersSlice';
import { burgerConstructorSlice } from '../slices/burgerConstructorSlice';

export const rootReducer = combineSlices(
  ingredientsSlice,
  burgerConstructorSlice,
  ordersSlice,
  feedSlice,
  profileSlice,
  submittedOrdersSlice
);
