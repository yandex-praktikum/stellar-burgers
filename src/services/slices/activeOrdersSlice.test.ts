import { expect, test } from '@jest/globals';
import {
  submittedOrdersSlice,
  fetchSubmitOrders,
  initialState
} from './activeOrdersSlice';

describe('submittedOrdersSlice', () => {
  test('fetchSubmitOrders.pending устанавливает fetchingStatus в true', () => {
    const action = { type: fetchSubmitOrders.pending.type };
    const state = submittedOrdersSlice.reducer(initialState, action);
    expect(state.fetchingStatus).toBe(true);
    expect(state.orders).toEqual([]);
    expect(state.error).toBe(null);
  });

  test('fetchSubmitOrders.fulfilled устанавливает заказы и fetchingStatus в false', () => {
    const ordersData = [{ id: '1', name: 'Order 1' }];
    const action = {
      type: fetchSubmitOrders.fulfilled.type,
      payload: ordersData
    };
    const state = submittedOrdersSlice.reducer(initialState, action);
    expect(state.orders).toEqual(ordersData);
    expect(state.fetchingStatus).toBe(false);
  });

  test('fetchSubmitOrders.rejected устанавливает ошибку и fetchingStatus в false', () => {
    const errorMessage = 'Error message';
    const action = {
      type: fetchSubmitOrders.rejected.type,
      error: { message: errorMessage }
    };
    const state = submittedOrdersSlice.reducer(initialState, action);
    expect(state.error).toBe(errorMessage);
    expect(state.fetchingStatus).toBe(false);
  });
});
