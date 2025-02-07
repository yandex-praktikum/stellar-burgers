import { combineSlices } from '@reduxjs/toolkit';
import { describe, it, expect } from '@jest/globals';
import burgerSlice from './slices/burgerSlice';
import orderSlice from './slices/orderSlice';
import userSlice from './slices/userSlice';
import { initialState as burgerSliceInitialState } from './slices/burgerSlice';
import { initialState as orderSliceInitialState } from './slices/orderSlice';
import { initialState as userSliceInitialState } from './slices/userSlice';

const initialState = {
  burger: burgerSliceInitialState,
  orderReducer: orderSliceInitialState,
  userReducer: userSliceInitialState
};

describe('Тестирование rootReducer', () => {
  it('Тестирование rootReducer', () => {
    const rootReducer = combineSlices(burgerSlice, orderSlice, userSlice);
    expect(rootReducer(undefined, { type: '' })).toEqual(initialState);
  });
});
