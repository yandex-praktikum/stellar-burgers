import { describe, expect, test, jest } from '@jest/globals';
import {
  fetchProfileOrders,
  profileOrdersReducer
} from './slice-profile-orders';
import * as api from '@api';

jest.mock('@api');
const apiMock = api as jest.Mocked<typeof api>;

const getInitialState = () =>
  profileOrdersReducer(undefined, { type: '@@init' });

const orders = [
  {
    _id: 'order-1',
    status: 'done',
    name: 'Test order',
    createdAt: '2026-01-25T00:00:00.000Z',
    updatedAt: '2026-01-25T00:00:00.000Z',
    number: 1,
    ingredients: ['bun-1', 'main-1']
  },
  {
    _id: 'order-2',
    status: 'pending',
    name: 'Another order',
    createdAt: '2026-01-25T00:00:00.000Z',
    updatedAt: '2026-01-25T00:00:00.000Z',
    number: 2,
    ingredients: ['bun-2', 'main-2']
  }
];

describe('Слайс профиль тест все редьюсеры', () => {
  test('fetchProfileOrders pending', () => {
    const state = profileOrdersReducer(
      getInitialState(),
      fetchProfileOrders.pending('', undefined)
    );
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('fetchProfileOrders fulfilled', () => {
    const state = profileOrdersReducer(
      getInitialState(),
      fetchProfileOrders.fulfilled(orders, '', undefined)
    );
    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(orders);
  });

  test('fetchProfileOrders rejected', () => {
    const state = profileOrdersReducer(
      getInitialState(),
      fetchProfileOrders.rejected(null, '', undefined, 'Failed to load')
    );
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Failed to load');
  });
});

describe('слайс профиль асинхронные екшены тест', () => {
  test('fetchProfileOrders fulfilled', async () => {
    apiMock.getOrdersApi.mockResolvedValue(orders);
    const dispatch = jest.fn();
    const getState = jest.fn();
    const thunk = fetchProfileOrders();
    const result = await thunk(dispatch, getState, undefined);
    expect(apiMock.getOrdersApi).toHaveBeenCalled();
    expect(result.type).toBe('profileOrders/fetch/fulfilled');
  });

  test('fetchProfileOrders rejected', async () => {
    apiMock.getOrdersApi.mockRejectedValue(new Error('Profile orders error'));
    const dispatch = jest.fn();
    const getState = jest.fn();
    const thunk = fetchProfileOrders();
    const result = await thunk(dispatch, getState, undefined);
    expect(result.type).toBe('profileOrders/fetch/rejected');
  });
});
