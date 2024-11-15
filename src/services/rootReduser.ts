import { combineSlices } from '@reduxjs/toolkit';
import { userAuthSlice } from '../components/slices/userAuthSlice';
import { burgerConstructorSlice } from '../components/slices/burgerConstructionSlice';
import { burgerIngredientsSlice } from '../components/slices/burgerIngridientsSlice';
import { feedSlice } from '../components/slices/feedSlice';
import { orderSlice } from '../components/slices/orderSlice';

export const rootReducer = combineSlices(
  userAuthSlice,
  burgerIngredientsSlice,
  burgerConstructorSlice,
  feedSlice,
  orderSlice
);
