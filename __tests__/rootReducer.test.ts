import rootReducer from './../src/services/rootReducer';

describe('Тестирование инициализации стора', () => {
  test('Тестирование RootReducer, должен возвращать стейт без изменений', () => {
    const initialState = {
      ingredients: {
        ingredients: [],
        isLoading: false,
        error: null
      },
      constructorSlice: {
        bun: null,
        ingredients: []
      },
      orders: {
        feeds: [],
        orders: [],
        total: 0,
        totalToday: 0,
        error: null,
        selectedOrder: null
      },
      user: {
        isUserCheckInProgress: false,
        user: null,
        error: null
      },
      orderSlice: {
        orderRequest: false,
        orderIngredients: [],
        orderData: null,
        error: null
      }
    };
    const newState = rootReducer(initialState, {} as any);
    expect(newState).toEqual(initialState);
  });
});
