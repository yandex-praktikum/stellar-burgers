import {
  fetchOrders,
  getOrders,
  fetchFeedsNumber,
  resetOrderModal,
  initialState as ordersInitialState
} from '../ordersSlice';
import ordersReducer from '../ordersSlice';
import { TOrder } from '../../../utils/types';

// Моковые данные для заказов
const ordersMockData: TOrder[] = [
  {
    _id: '1',
    ingredients: ['ingredient1', 'ingredient2'],
    status: 'done',
    name: 'Order 1',
    createdAt: '2023-10-01T12:00:00Z',
    updatedAt: '2023-10-01T12:00:00Z',
    number: 1
  }
];

// Моковые данные для одного заказа
const orderMockData: TOrder = {
  _id: '2',
  ingredients: ['ingredient3', 'ingredient4'],
  status: 'pending',
  name: 'Order 2',
  createdAt: '2023-10-02T12:00:00Z',
  updatedAt: '2023-10-02T12:00:00Z',
  number: 2
};

// Моковые данные для заказа по номеру
const orderByNumberMockData = {
  success: true,
  orders: [
    {
      _id: '3',
      ingredients: ['ingredient5', 'ingredient6'],
      status: 'done',
      name: 'Order 3',
      createdAt: '2023-10-03T12:00:00Z',
      updatedAt: '2023-10-03T12:00:00Z',
      number: 3
    }
  ]
};

describe('Тестирование редьюсера слайса ordersSlice', () => {
  describe('Асинхронная функция для создания заказа: fetchOrders', () => {
    test('Начало запроса: fetchOrders.pending', () => {
      const state = ordersReducer(
        ordersInitialState,
        fetchOrders.pending('requestId', ['ingredient1', 'ingredient2'])
      );

      // Проверяем, что isLoading и orderRequest становятся true, а error остается null
      expect(state.isLoading).toBeTruthy();
      expect(state.orderRequest).toBeTruthy();
      expect(state.error).toBeNull();
    });

    test('Результат запроса: fetchOrders.fulfilled', () => {
      const state = ordersReducer(
        ordersInitialState,
        fetchOrders.fulfilled(
          { order: orderMockData, success: true, name: 'Order 2' },
          'requestId',
          ['ingredient1', 'ingredient2']
        )
      );

      // Проверяем, что isLoading становится false, error остается null, orderModal обновляется
      expect(state.isLoading).toBeFalsy();
      expect(state.error).toBeNull();
      expect(state.orderModal).toEqual(orderMockData);
      expect(state.orderRequest).toBeFalsy();
    });

    test('Ошибка запроса: fetchOrders.rejected', () => {
      const error = { message: 'Ошибка создания заказа' };

      const state = ordersReducer(
        ordersInitialState,
        fetchOrders.rejected(new Error(error.message), 'requestId', [
          'ingredient1',
          'ingredient2'
        ])
      );

      // Проверяем, что isOrderLoading становится false, ошибка записывается в error
      expect(state.isOrderLoading).toBeFalsy();
      expect(state.error?.message).toEqual(error.message);
      expect(state.orderRequest).toBeFalsy();
    });
  });

  describe('Асинхронная функция для получения заказов: getOrders', () => {
    test('Начало запроса: getOrders.pending', () => {
      const state = ordersReducer(
        ordersInitialState,
        getOrders.pending('requestId')
      );

      // Проверяем, что isLoading становится true, а error остается null
      expect(state.isLoading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    test('Результат запроса: getOrders.fulfilled', () => {
      const state = ordersReducer(
        ordersInitialState,
        getOrders.fulfilled(ordersMockData, 'requestId')
      );

      // Проверяем, что isLoading становится false, error остается null, orders обновляется
      expect(state.isLoading).toBeFalsy();
      expect(state.error).toBeNull();
      expect(state.orders).toEqual(ordersMockData);
    });

    test('Ошибка запроса: getOrders.rejected', () => {
      const error = { message: 'Ошибка получения заказов' };

      const state = ordersReducer(
        ordersInitialState,
        getOrders.rejected(new Error(error.message), 'requestId')
      );

      // Проверяем, что isLoading становится false, ошибка записывается в error
      expect(state.isLoading).toBeFalsy();
      expect(state.error?.message).toEqual(error.message);
    });
  });

  describe('Асинхронная функция для получения заказа по номеру: fetchFeedsNumber', () => {
    test('Начало запроса: fetchFeedsNumber.pending', () => {
      const state = ordersReducer(
        ordersInitialState,
        fetchFeedsNumber.pending('requestId', 123)
      );

      // Проверяем, что isLoading становится true, а error остается null
      expect(state.isLoading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    test('Результат запроса: fetchFeedsNumber.fulfilled', () => {
      const state = ordersReducer(
        ordersInitialState,
        fetchFeedsNumber.fulfilled(orderByNumberMockData, 'requestId', 123)
      );

      // Проверяем, что isLoading становится false, error остается null, orderNumber обновляется
      expect(state.isLoading).toBeFalsy();
      expect(state.error).toBeNull();
      expect(state.orderNumber).toEqual(orderByNumberMockData.orders);
    });

    test('Ошибка запроса: fetchFeedsNumber.rejected', () => {
      const error = { message: 'Ошибка получения заказа по номеру' };

      const state = ordersReducer(
        ordersInitialState,
        fetchFeedsNumber.rejected(new Error(error.message), 'requestId', 123)
      );

      // Проверяем, что isLoading становится false, ошибка записывается в error
      expect(state.isLoading).toBeFalsy();
      expect(state.error?.message).toEqual(error.message);
    });
  });

  describe('Редьюсер: resetOrderModal', () => {
    test('Сброс orderModal', () => {
      const stateWithOrderModal = {
        ...ordersInitialState,
        orderModal: orderMockData
      };

      const state = ordersReducer(stateWithOrderModal, resetOrderModal());

      // Проверяем, что orderModal сбрасывается в null
      expect(state.orderModal).toBeNull();
    });
  });
});
