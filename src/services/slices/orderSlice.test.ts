import { describe, it, expect } from '@jest/globals';
import orderSlice, {
  fetchFeed,
  fetchOrderBurger,
  fetchOrders,
  initialState
} from './orderSlice';
import * as ordersResult from '../../../cypress/fixtures/orderResult.json';
import * as feedResult from '../../../cypress/fixtures/feedOrders.json';
import * as orderResult from '../../../cypress/fixtures/order.json';

describe('Тестирование async actions заказов', () => {
  it('Тестирование получения заказов', () => {
    expect(
      orderSlice.reducer(undefined, {
        type: fetchOrders.pending.type,
        payload: {}
      })
    ).toEqual({ ...initialState, isLoading: true, isError: false });
    expect(
      orderSlice.reducer(undefined, {
        type: fetchOrders.rejected.type,
        error: { message: 'error' }
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      isError: true,
      errorMessage: 'error'
    });
    expect(
      orderSlice.reducer(undefined, {
        type: fetchOrders.fulfilled.type,
        payload: ordersResult.payload
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      isError: false,
      profileOrders: ordersResult.payload.orders,
      total: ordersResult.payload.total,
      totalToday: ordersResult.payload.totalToday
    });
    expect(
      orderSlice.reducer(undefined, {
        type: fetchFeed.pending.type,
        payload: {}
      })
    ).toEqual({ ...initialState, isLoading: true, isError: false });
  });
  it('Тестирование ленты заказов', () => {
    expect(
      orderSlice.reducer(undefined, {
        type: fetchFeed.rejected.type,
        error: {
          message: 'error'
        }
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      isError: true,
      errorMessage: 'error'
    });
    expect(
      orderSlice.reducer(undefined, {
        type: fetchFeed.fulfilled.type,
        payload: feedResult.payload
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      isError: false,
      feedOrders: feedResult.payload.orders,
      total: feedResult.payload.total,
      totalToday: feedResult.payload.totalToday
    });
  });
  it('Тестирование заказа', () => {
    expect(
      orderSlice.reducer(undefined, {
        type: fetchOrderBurger.pending.type,
        payload: {}
      })
    ).toEqual({ ...initialState, isLoading: true, isError: false });
    expect(
      orderSlice.reducer(undefined, {
        type: fetchOrderBurger.rejected.type,
        error: {
          message: 'error'
        }
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      isError: true,
      errorMessage: 'error'
    });
    expect(
      orderSlice.reducer(undefined, {
        type: fetchOrderBurger.fulfilled.type,
        payload: orderResult
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      isError: false,
      orderModalData: orderResult.order,
      isOrderModalOpened: true
    });
  });
});
