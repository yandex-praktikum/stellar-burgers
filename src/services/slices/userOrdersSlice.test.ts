import { configureStore } from '@reduxjs/toolkit';
import {
  fetchUserOrders,
  getOrdersSelector,
  TOrderState,
  userOrdersReducer
} from './userOrdersSlice';

const testStore = () =>
  configureStore({
    reducer: {
      userOrders: userOrdersReducer
    },
    preloadedState: {
      userOrders: userOrdersData
    }
  });

const userOrdersData: TOrderState = {
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
  isLoading: false
};

describe('userOrdersSlice', () => {
  describe('selectors', () => {
    test('getOrdersSelector', () => {
      const store = testStore();
      const state = store.getState();
      const userOrders = getOrdersSelector(state);
      expect(userOrders).toEqual(userOrdersData.orders);
    });
  });

  describe('extraReducers', () => {
    const store = testStore();
    test('fetchUserOrders fulfilled', () => {
      store.dispatch({
        type: fetchUserOrders.fulfilled.type,
        payload: userOrdersData.orders
      });
      const state = store.getState();
      expect(state.userOrders.isLoading).toBe(false);
      expect(state.userOrders.orders).toEqual(userOrdersData.orders);
    });

    test('fetchUserOrders pending', () => {
      store.dispatch({ type: fetchUserOrders.pending.type });
      const state = store.getState();
      expect(state.userOrders.isLoading).toBe(true);
    });

    test('fetchUserOrders rejected', () => {
      store.dispatch({ type: fetchUserOrders.rejected.type });
      const state = store.getState();
      expect(state.userOrders.isLoading).toBe(false);
    });
  });
});
