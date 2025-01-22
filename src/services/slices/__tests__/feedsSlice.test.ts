import { fetchFeeds, feedsInitialState } from '../feedsSlice';
import { TOrdersData } from '../../../utils/types';
import reducer from '../feedsSlice';

const feedsMockData: TOrdersData = {
  orders: [],
  total: 10,
  totalToday: 5
};
describe('Тестирование редьюсера слайса feedsSlice', () => {
  describe('Асинхронная функция для получения ленты заказов: fetchFeeds', () => {
    test('Начало запроса: fetchFeeds.pending', () => {
      const state = reducer(feedsInitialState, fetchFeeds.pending('pending'));

      expect(state.isLoading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    test('Результат запроса: fetchFeeds.fulfilled', () => {
      const state = reducer(
        feedsInitialState,
        fetchFeeds.fulfilled(feedsMockData, 'fulfilled')
      );

      // Проверяем, что isLoading становится false, error остается null, и данные обновляются
      expect(state.isLoading).toBeFalsy();
      expect(state.error).toBeNull();
      expect(state.feeds).toEqual(feedsMockData);
    });

    test('Ошибка запроса: fetchFeeds.rejected', () => {
      const error = { message: 'Ошибка загрузки ленты заказов' };

      const state = reducer(
        feedsInitialState,
        fetchFeeds.rejected(new Error(error.message), 'rejected')
      );

      // Проверяем, что isLoading становится false, а ошибка записывается в error
      expect(state.isLoading).toBeFalsy();
      expect(state.error?.message).toEqual(error.message);
    });
  });
});
