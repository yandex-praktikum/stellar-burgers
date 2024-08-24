import { combineReducers } from 'redux';
import { combineSlices } from '@reduxjs/toolkit';
import { ingredientsSlice } from '../slices/ingredientsSlice';
import { burgerConstructorSlice } from '../slices/burgerContructorSlice';

export const rootReducer = combineSlices(
  ingredientsSlice,
  burgerConstructorSlice
);
