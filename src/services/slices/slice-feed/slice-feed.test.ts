import { expect, test } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import { feedsReducer, fetchFeeds } from './slice-feed';

describe('Проврека асинронных екшенов и редьюсеров слайса фид', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    success: false,
    isLoading: false,
    error: null
  };

  const expectedResult = {
    success: true,
    orders: [
      {
        _id: '1',
        status: 'ok',
        name: 'order',
        createdAt: '01.02.2002',
        updatedAt: '01.02.2002',
        number: 123,
        ingredients: ['chuken', 'buns']
      }
    ],
    total: 1,
    totalToday: 5
  };

  test('тест загрузки фидов', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(expectedResult)
      })
    ) as jest.Mock;

    const store = configureStore({
      reducer: { feeds: feedsReducer }
    });

    await store.dispatch(fetchFeeds());

    const { orders, total, totalToday } = store.getState().feeds;
    // и сравниваем их с ожидаемым результатом
    expect(orders).toEqual(expectedResult.orders);
    expect(total).toBe(expectedResult.total);
    expect(totalToday).toBe(expectedResult.totalToday);
  });

  test('pending', () => {
    const state = feedsReducer(initialState, fetchFeeds.pending('', undefined));
    expect(state).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      success: false,
      isLoading: true,
      error: null
    });
  });

  test('fulfilled', () => {
    const state = feedsReducer(
      initialState,
      fetchFeeds.fulfilled(expectedResult, '', undefined)
    );
    expect(state).toEqual({
      orders: expectedResult.orders,
      total: expectedResult.total,
      totalToday: expectedResult.totalToday,
      success: expectedResult.success,
      isLoading: false,
      error: null
    });
  });

  test('rejected', () => {
    const state = feedsReducer(
      initialState,
      fetchFeeds.rejected(null, '', undefined, 'Failed to load feeds')
    );

    expect(state).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      success: false,
      isLoading: false,
      error: 'Failed to load feeds'
    });
  });
});
