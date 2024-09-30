import { configureStore } from '@reduxjs/toolkit';
import {
  newOrderReducer,
  resetOrder,
  takeNewOrder,
  TNewOrderState
} from './newOrderSlice';
import { initialState as newOrderInitialState } from './newOrderSlice';

const testStore = () =>
  configureStore({
    reducer: {
      newOrder: newOrderReducer
    },
    preloadedState: {
      newOrder: mockedOrderData
    }
  });

const mockedOrderData: TNewOrderState = {
  orderRequest: false,
  orderModalData: {
    _id: '66fad4f207d06e001c3719c3',
    status: 'done',
    name: 'Флюоресцентный люминесцентный био-марсианский бургер',
    createdAt: '2024-09-30T16:42:26.241Z',
    updatedAt: '2024-09-30T16:42:27.058Z',
    number: 54710,
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa093d'
    ]
  },
  error: undefined
};

describe('newOrderSlice', () => {
  describe('initialState', () => {
    test('', () => {
      const initialState = newOrderReducer(undefined, {
        type: 'UNKNOWN_ACTION'
      });
      expect(initialState).toEqual(newOrderInitialState);
    });
  });

  describe('selectors', () => {
    const store = testStore();
    test('orderRequestSelector', () => {
      const orderRequest = store.getState().newOrder.orderRequest;
      expect(orderRequest).toBe(false);
    });

    test('orderModalDataSelector', () => {
      const orderModalData = store.getState().newOrder.orderModalData;
      expect(orderModalData).toEqual(mockedOrderData.orderModalData);
    });
  });

  describe('extraReducers', () => {
    const store = testStore();
    test('takeNewOrder fulfilled', () => {
      store.dispatch({
        type: takeNewOrder.fulfilled.type,
        payload: { order: mockedOrderData.orderModalData }
      });
      const state = store.getState();
      expect(state.newOrder.orderRequest).toBe(false);
      expect(state.newOrder.orderModalData).toEqual(
        mockedOrderData.orderModalData
      );
    });

    test('takeNewOrder pending', () => {
      store.dispatch({
        type: takeNewOrder.pending.type
      });
      const state = store.getState();
      expect(state.newOrder.orderRequest).toBe(true);
    });

    test('takeNewOrder rejected', () => {
      const errorMessage = 'error';
      store.dispatch({
        type: takeNewOrder.rejected.type,
        error: { message: errorMessage }
      });
      const state = store.getState();
      expect(state.newOrder.error).toBe(errorMessage);
    });
  });

  describe('reducers', () => {
    test('resetOrder', () => {
      const store = testStore();
      store.dispatch(resetOrder());
      const state = store.getState();
      expect(state.newOrder).toEqual(newOrderInitialState);
    });
  });
});
