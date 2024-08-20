import { getAllFeeds, initialState } from './feedsSlice';
import { feedsReducer } from './feedsSlice';

describe('тест асинхронных экшенов', () => {
  describe('запрос заказов', () => {
    it('тест getAllFeeds.fulfilled', () => {
      const action = {
        type: getAllFeeds.fulfilled.type,
        payload: { orders: ['test'], total: 1, totalToday: 1 }
      };

      const newState = feedsReducer(initialState, action);
      expect(newState).toEqual({
        orders: ['test'],
        total: 1,
        totalToday: 1,
        error: undefined,
        isLoading: false
      });
    });

    it('тест getAllFeeds.rejected', () => {
      const action = {
        type: getAllFeeds.rejected.type,
        error: { message: 'test' }
      };

      const newState = feedsReducer(initialState, action);
      expect(newState).toEqual({
        orders: [],
        total: 0,
        totalToday: 0,
        error: 'test',
        isLoading: false
      });
    });
  });
});
