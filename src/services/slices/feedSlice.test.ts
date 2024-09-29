import { configureStore } from '@reduxjs/toolkit';
import { feedsReducer, ordersSelector, TFeedsState } from './feedsSlice';

const testStore = () => {
  configureStore({
    reducer: {
      feeds: feedsReducer
    }
  });
};
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
  total: 0,
  totalToday: 0
};

describe('feedSlice', () => {
  describe('selectors', () => {
    +test('ordersselector', () => {
      const state = { feeds: feedsData };
      //   const selectedOrders = ordersSelector(state.feeds);
    });
  });
});
