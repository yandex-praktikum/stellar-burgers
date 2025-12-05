import store, { RootState } from './store';

describe('Store Configuration', () => {
  test('should initialize with correct structure', () => {
    const state: RootState = store.getState();

    expect(state).toHaveProperty('user');
    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('orders');
    expect(state).toHaveProperty('burgerConstructor');
  });

  test('should have correct initial state for user slice', () => {
    const state = store.getState();

    expect(state.user).toEqual({
      user: null,
      isAuthChecked: false,
      isAuthenticated: false,
      loginRequest: false,
      loginError: null,
      registerRequest: false,
      registerError: null
    });
  });

  test('should have correct initial state for ingredients slice', () => {
    const state = store.getState();

    expect(state.ingredients).toEqual({
      ingredients: [],
      loading: false,
      error: null
    });
  });

  test('should have correct initial state for orders slice', () => {
    const state = store.getState();

    expect(state.orders).toEqual({
      orders: [],
      feed: [],
      total: 0,
      totalToday: 0,
      currentOrder: null,
      orderRequest: false,
      orderError: null,
      loading: false,
      error: null
    });
  });

  test('should have correct initial state for burgerConstructor slice', () => {
    const state = store.getState();

    expect(state.burgerConstructor).toEqual({
      bun: null,
      ingredients: []
    });
  });
});
