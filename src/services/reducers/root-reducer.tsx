import { combineReducers } from 'redux';
import { combineSlices } from '@reduxjs/toolkit';
import { ingredientsSlice } from '../slices/ingredientsSlice';
import { burgerConstructorSlice } from '../slices/burgerContructorSlice';
import { orderSlice } from '../slices/orderSlice';
import { feedSlice } from '../slices/feedSlice';
import { userSlice } from '../slices/userSlice';

export const rootReducer = combineSlices(
  ingredientsSlice,
  burgerConstructorSlice,
  orderSlice,
  feedSlice,
  userSlice
);
