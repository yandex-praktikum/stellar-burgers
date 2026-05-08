import { rootReducer } from './store';

describe('rootReducer', () => {
  test('Должен корректно инициализировать store', () => {
    const initialState = rootReducer(undefined, { type: 'TEST_ACTION' });
    expect(initialState).toEqual({
      ingredients: {
        data: [],
        isLoading: false,
        error: null
      },
      burgerConstructor: {
        bun: null,
        ingredients: []
      },
      order: {
        orderRequest: false,
        orderModalData: null,
        currentOrder: null
      },
      user: {
        user: null,
        isAuth: false,
        userRequest: false,
        isUserChecked: false
      },
      feed: {
        orders: [],
        total: 0,
        totalToday: 0,
        feedRequest: false
      },
      userOrders: {
        orders: [],
        ordersRequest: false,
        ordersError: null
      }
    });
  });
});
