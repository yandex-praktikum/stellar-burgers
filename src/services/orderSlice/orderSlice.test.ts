import { configureStore } from '@reduxjs/toolkit';
import feedsReducer, {
  getFeeds,
  getOrderByNumber,
  initialState
} from './orderSlice';
import { TOrder } from '../../utils/types';

const mockOrder: TOrder = {
  _id: '669ea1ed119d45001b4fae96',
  ingredients: [
    '643d69a5c3f7b9001cfa093c',
    '643d69a5c3f7b9001cfa093e',
    '643d69a5c3f7b9001cfa0943',
    '643d69a5c3f7b9001cfa093c'
  ],
  status: 'done',
  name: 'Краторный space люминесцентный бургер',
  createdAt: '2024-07-22T18:16:13.171Z',
  updatedAt: '2024-07-22T18:16:13.632Z',
  number: 46954
};

describe('feedsSlice reducers and async actions', () => {
  it('Проверка начального состояния', () => {
    expect(feedsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('extra reducers', () => {
    it('Тест для getFeeds.pending', () => {
      const action = { type: getFeeds.pending.type };
      const state = feedsReducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('Тест для getFeeds.fulfilled', () => {
      const feedData = { orders: [mockOrder], total: 100, totalToday: 10 };
      const action = { type: getFeeds.fulfilled.type, payload: feedData };
      const state = feedsReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.orders).toEqual(feedData.orders);
      expect(state.total).toEqual(feedData.total);
      expect(state.totalToday).toEqual(feedData.totalToday);
    });

    it('Тест для getFeeds.rejected', () => {
      const error = { message: 'Ошибка при получении feed' };
      const action = { type: getFeeds.rejected.type, error };
      const state = feedsReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toEqual(error.message);
    });

    it('Тест для getOrderByNumber.fulfilled', () => {
      const action = {
        type: getOrderByNumber.fulfilled.type,
        payload: { orders: [mockOrder] }
      };
      const state = feedsReducer(initialState, action);
      expect(state.testOrderByNumber).toEqual(mockOrder);
    });
  });
});
