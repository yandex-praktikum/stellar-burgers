import { getFeeds } from '../src/services/slices/feedSlice';

import { initialState } from '../src/services/slices/feedSlice';

import feedSliceReducer from '../src/services/slices/feedSlice';

const feedsMockData = {
  orders: [],
  total: 1,
  totalToday: 1
};

describe('Тестирование feedSlice', () => {
  describe('Функция для получения заказов: getFeeds', () => {
    test('Начало запроса: getFeeds.pending', () => {
      const state = feedSliceReducer(initialState, getFeeds.pending('pending'));
      expect(state.isLoading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    test('Результат запроса: getFeeds.fulfilled', () => {
      const state = feedSliceReducer(
        initialState,
        getFeeds.fulfilled(feedsMockData, 'fulfilled')
      );
      expect(state.isLoading).toBeFalsy();
      expect(state.error).toBeNull();
      expect(state.data).toEqual(feedsMockData);
    });

    test('Ошибка запроса: getFeeds.rejected', () => {
      const error = 'fetchFeeds.rejected';
      const state = feedSliceReducer(
        initialState,
        getFeeds.rejected(new Error(error), 'rejected')
      );
      expect(state.isLoading).toBeFalsy();
      expect(state.error?.message).toEqual(error);
    });
  });
});
