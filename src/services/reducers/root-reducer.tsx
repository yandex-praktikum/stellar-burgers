import { combineReducers } from 'redux';
import { combineSlices } from '@reduxjs/toolkit';
import { ingredientsSlice } from '../slices/ingredientsSlice';

export const rootReducer = combineSlices(ingredientsSlice);
