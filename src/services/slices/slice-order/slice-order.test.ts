import { describe, expect, test } from '@jest/globals';
import {
  clearOrder,
  fetchOrderByNumber,
  orderReducer,
  placeOrder
} from './slice-order';

const getInitialState = () => orderReducer(undefined, { type: '@@init' });

const order = {
  _id: 'order-1',
  status: 'done',
  name: 'Test order',
  createdAt: '2026-01-25T00:00:00.000Z',
  updatedAt: '2026-01-25T00:00:00.000Z',
  number: 123,
  ingredients: ['bun-1', 'main-1']
};

describe('Слайс ордер тесты редьюсеры ', () => {
  test('clearOrder resets orderModalData', () => {
    const state = orderReducer(
      { ...getInitialState(), orderModalData: order },
      clearOrder()
    );
    expect(state.orderModalData).toBeNull();
  });

  test('placeOrder pending', () => {
    const state = orderReducer(getInitialState(), placeOrder.pending('', []));
    expect(state.orderRequest).toBe(true);
    expect(state.error).toBeNull();
  });

  test('placeOrder fulfilled', () => {
    const state = orderReducer(
      getInitialState(),
      placeOrder.fulfilled({ success: true, name: 'order', order }, '', [])
    );
    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toEqual(order);
  });

  test('placeOrder rejected', () => {
    const state = orderReducer(
      getInitialState(),
      placeOrder.rejected(null, '', [], 'Order error')
    );
    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe('Order error');
  });

  test('fetchOrderByNumber pending', () => {
    const state = orderReducer(
      getInitialState(),
      fetchOrderByNumber.pending('', 123)
    );
    expect(state.orderDetailsRequest).toBe(true);
    expect(state.orderDetailsError).toBeNull();
  });

  test('fetchOrderByNumber fulfilled', () => {
    const state = orderReducer(
      getInitialState(),
      fetchOrderByNumber.fulfilled(order, '', 123)
    );
    expect(state.orderDetailsRequest).toBe(false);
    expect(state.orderDetails).toEqual(order);
  });

  test('fetchOrderByNumber rejected', () => {
    const state = orderReducer(
      getInitialState(),
      fetchOrderByNumber.rejected(null, '', 123, 'Not found')
    );
    expect(state.orderDetailsRequest).toBe(false);
    expect(state.orderDetailsError).toBe('Not found');
  });
});
