//These tests check the Feed data slice reducers

import { error } from 'console';
import {
  getFeedData,
  getOrderByNum,
  TStateFeed,
  feedDataSlice
} from './FeedDataSlice';

// Начальное состояние для тестов, вынесенное в глобальную переменную для общего доступа
const initialState: TStateFeed = {
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
  loading: false,
  modalOrder: null
};

//Тестовые данные заказов для использования в тестах, в глобальной переменной для общего доступа
const testOrders = {
  success: true,
  orders: [
    {
      _id: '1',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093e'
      ],
      status: 'done',
      name: 'Краторный люминесцентный бургер',
      createdAt: '2024-09-02T13:46:25.234Z',
      updatedAt: '2024-09-02T13:46:25.914Z',
      number: 1
    },
    {
      _id: '2',
      ingredients: [
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093f',
        '643d69a5c3f7b9001cfa0946',
        '643d69a5c3f7b9001cfa0949',
        '643d69a5c3f7b9001cfa0945',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Антарианский краторный бессмертный минеральный экзо-плантаго био-марсианский бургер',
      createdAt: '2024-09-02T07:36:55.648Z',
      updatedAt: '2024-09-02T07:36:56.126Z',
      number: 2
    },
    {
      _id: '3',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный space бургер',
      createdAt: '2024-09-02T07:34:44.831Z',
      updatedAt: '2024-09-02T07:34:45.280Z',
      number: 3
    }
  ],
  total: 3,
  totalToday: 3
};

describe('Feed data slice tests', () => {
  // Проверка на установку loading в true и сброс ошибки (error) при состоянии pending
  it('test should set load to true and err to null during pending status', () => {
    const actualState = feedDataSlice.reducer(
      {
        ...initialState,
        error: 'Test err'
      },
      getFeedData.pending('')
    );
    expect(actualState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      error: null,
      loading: true, // Ошибка сбрасывается
      modalOrder: null // Загрузка начинается
    });
  });

  // Проверка на установку данных после успешной загрузки
  it('test should set load to false and upd feed data', () => {
    const actualState = feedDataSlice.reducer(
      {
        ...initialState,
        loading: true
      },
      getFeedData.fulfilled(testOrders, '')
    );

    //проверяем, что  данные корректно сохраняются в состояние, а флаг загрузки (loading) сбрасывается.
    expect(actualState).toEqual({
      orders: testOrders.orders,
      total: testOrders.total,
      totalToday: testOrders.totalToday,
      error: null,
      loading: false,
      modalOrder: null
    });
  });

  // Проверка на установку ошибки (error) при отклонении загрузки данных
  it('test should set err to err message and loading to false', () => {
    const testErr = new Error('Test err');
    const actualState = feedDataSlice.reducer(
      {
        ...initialState,
        loading: true
      },
      getFeedData.rejected(testErr, '')
    );

    // Проверяем, что ошибка корректно сохраняется в состояние, а флаг загрузки (loading) сбрасывается.
    expect(actualState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      modalOrder: null,
      loading: false,
      error: 'Test err'
    });
  });

  // Проверка на установку loading в true при запросе заказа по номеру (pending)
  it('test get order by number should set loading to true', () => {
    const actualState = feedDataSlice.reducer(
      {
        ...initialState,
        error: 'Test err'
      },
      getOrderByNum.pending('1', 1) //аргументы (номер заказа и идентификатор запроса) не используются непосредственно в тесте, но необходимы для соответствия сигнатуре запроса
    );
    expect(actualState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      error: null,
      loading: true,
      modalOrder: null
    });
  });

  // Проверка на установку заказа в modalOrder и завершение загрузки (fulfilled)
  it('test get order by number should set loading to false', () => {
    const actualState = feedDataSlice.reducer(
      {
        ...initialState,
        loading: true
      },
      getOrderByNum.fulfilled(testOrders, '1', 1)
    );

    //проверяем, что modalOrder обновился, а loading завершена
    expect(actualState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      error: null,
      loading: false,
      modalOrder: testOrders.orders[0]
    });
  });

  // Проверка на установку ошибки и завершение загрузки при отказе в получении заказа (rejected)
  it('test get order by number should set loading to false and set err', () => {
    const testErr = new Error('Test err');
    const actualState = feedDataSlice.reducer(
      {
        ...initialState,
        loading: true
      },
      getOrderByNum.rejected(testErr, '1', 1)
    );
    // Проверяем, что ошибка сохраняется, а флаг загрузки (loading) сбрасывается.
    expect(actualState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      modalOrder: null,
      loading: false,
      error: 'Test err'
    });
  });
});
