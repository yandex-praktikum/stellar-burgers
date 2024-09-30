import { configureStore } from '@reduxjs/toolkit';
import {
  feedsReducer,
  fetchAllFeeds,
  ordersSelector,
  TFeedsState,
  totalOrdersSelector,
  totalTodayOrdersSelector
} from './feedsSlice';

const testStore = () =>
  configureStore({
    reducer: {
      feeds: feedsReducer
    }
  });

const feedsData: TFeedsState = {
  error: undefined,
  loading: false,
  orders: [
    {
      _id: '66f8ff82119d45001b50a3a3',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный био-марсианский бургер',
      createdAt: '2024-09-29T07:19:30.697Z',
      updatedAt: '2024-09-29T07:19:31.526Z',
      number: 54538
    }
  ],
  total: 1,
  totalToday: 1
};

describe('feedSlice', () => {
  describe('selectors', () => {
    const store = testStore();
    store.dispatch({
      type: fetchAllFeeds.fulfilled.type,
      payload: feedsData
    });
    const state = store.getState();
    test('ordersselector', () => {
      const selectedOrders = ordersSelector(state);
      expect(selectedOrders).toEqual(state.feeds.orders);
    });

    test('totalOrdersSelector', () => {
      const totalOrders = totalOrdersSelector(state);
      expect(totalOrders).toEqual(state.feeds.total);
    });

    test('totalTodayOrdersSelector', () => {
      const totalTodayOrders = totalTodayOrdersSelector(state);
      expect(totalTodayOrders).toEqual(state.feeds.totalToday);
    });
  });

  describe('extraReducers', () => {
    const store = testStore();
    test('pending', () => {
      store.dispatch({
        type: fetchAllFeeds.pending.type
      });
      const state = store.getState();
      expect(state.feeds.loading).toBe(true);
      expect(state.feeds.error).toBe(undefined);
    });

    test('fulfilled', () => {
      store.dispatch({
        type: fetchAllFeeds.fulfilled.type,
        payload: feedsData
      });
      const state = store.getState();
      expect(state.feeds.loading).toBe(false);
      expect(state.feeds.total).toBe(1);
      expect(state.feeds.totalToday).toBe(1);
      expect(state.feeds.orders).toEqual(feedsData.orders);
    });

    test('rejected', () => {
      const errorMessage = 'rejected message';
      store.dispatch({
        type: fetchAllFeeds.rejected.type,
        error: { message: errorMessage }
      });
      const state = store.getState();
      expect(state.feeds.orders).toEqual([]);
      expect(state.feeds.loading).toBe(false);
      expect(state.feeds.error).toEqual(errorMessage);
    });
  });
});
