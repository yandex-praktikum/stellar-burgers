import {
  getOrder,
  getOrders,
  createOrder,
  resetOrderModalData,
} from '../src/services/slices/orderSlice';
import { initialState } from '../src/services/slices/orderSlice';
import orderSliceReducer from '../src/services/slices/orderSlice';

const ordersMockData = [
  {
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa093d'
    ],
    _id: '6622337897ede0001d0666b5',
    status: 'done',
    name: 'TEST',
    createdAt: '2024-10-31T09:02:42.748Z',
    updatedAt: '2024-10-31T09:02:51.057Z',
    number: 38321
  }
];

describe('Тестирование orderSlice', () => {
  test('Сброс модального окна заказа', () => {
    const _initialState = {
      isOrderLoading: true,
      isOrdersLoading: true,
      orderRequest: false,
      orderModalData: ordersMockData[0],
      error: null,
      data: []
    };

    const state = orderSliceReducer(_initialState, resetOrderModalData());
    expect(state.orderModalData).toBeNull();
    expect(state.data).toHaveLength(0);
    expect(state.error).toBeNull();
    expect(state.orderRequest).toBeFalsy();
    expect(state.isOrdersLoading).toBeTruthy();
    expect(state.isOrderLoading).toBeTruthy();
  });

  describe('Функция для получения заказов: addOrders', () => {
    test('Начало запроса: addOrders.pending', () => {
      const state = orderSliceReducer(initialState, getOrders.pending('pending'));
      expect(state.isOrdersLoading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    test('Результат запроса: addOrders.fulfilled', () => {
      const state = orderSliceReducer(
        initialState,
        getOrders.fulfilled(ordersMockData, 'fulfilled')
      );
      expect(state.isOrdersLoading).toBeFalsy();
      expect(state.error).toBeNull();
      expect(state.data).toEqual(ordersMockData);
    });

    test('Ошибка запроса: addOrders.rejected', () => {
      const error = 'addOrders.rejected';
      const state = orderSliceReducer(
        initialState,
        getOrders.rejected(new Error(error), 'rejected')
      );
      expect(state.isOrdersLoading).toBeFalsy();
      expect(state.error?.message).toEqual(error);
    });
  });

  describe('Функция для получения заказа по номеру: addOrder', () => {
    test('Начало запроса: addOrder.pending', () => {
      const state = orderSliceReducer(
        initialState,
        getOrder.pending('pending', ordersMockData[0].number)
      );
      expect(state.isOrderLoading).toBeTruthy();
    });

    test('Результат запроса: addOrder.fulfilled', () => {
      const state = orderSliceReducer(
        initialState,
        getOrder.fulfilled(
          ordersMockData[0],
          'fulfilled',
          ordersMockData[0].number
        )
      );
      expect(state.isOrderLoading).toBeFalsy();
      expect(state.orderModalData).toEqual(ordersMockData[0]);
    });

    test('Ошибка запроса: addOrder.rejected', () => {
      const error = 'addOrder.rejected';
      const state = orderSliceReducer(
        initialState,
        getOrder.rejected(new Error(error), 'rejected', -1)
      );
      expect(state.isOrderLoading).toBeFalsy();
    });
  });

  describe('Функция для создания заказа: createOrder', () => {
    test('Начало запроса: createOrder.pending', () => {
      const state = orderSliceReducer(
        initialState,
        createOrder.pending('pending', ordersMockData[0].ingredients)
      );
      expect(state.orderRequest).toBeTruthy();
    });

    test('Результат запроса: createOrder.fulfilled', () => {
      const state = orderSliceReducer(
        initialState,
        createOrder.fulfilled(
          { order: ordersMockData[0], name: 'EXAMPLE' },
          'fulfilled',
          ordersMockData[0].ingredients
        )
      );
      expect(state.orderRequest).toBeFalsy();
      expect(state.orderModalData).toEqual(ordersMockData[0]);
    });

    test('Ошибка запроса: createOrder.rejected', () => {
      const error = 'createOrder.rejected';
      const state = orderSliceReducer(
        initialState,
        createOrder.rejected(new Error(error), 'rejected', [])
      );
      expect(state.orderRequest).toBeFalsy();
    });
  });
});
