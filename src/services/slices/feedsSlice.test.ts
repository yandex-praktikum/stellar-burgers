import { initialState, feedsReducer, fetchFeeds } from './feedSlice';

describe('Проверка редьсера слайса', () => {
  const mockFeedsOrders = {
    orders: [
      {
        _id: '6740c650b27b06001c3e9d07',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093d',
        ],
        status: 'done',
        name: 'Флюоресцентный бургер',
        createdAt: '2024-11-22T17:58:40.195Z',
        updatedAt: '2024-11-22T17:58:41.214Z',
        number: 60135,
      },
      {
        _id: '6740c589b27b06001c3e9d03',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa0941'
        ],
        status: 'done',
        name: 'Флюоресцентный люминесцентный био-марсианский бургер',
        createdAt: '2024-11-22T17:55:21.081Z',
        updatedAt: '2024-11-22T17:55:22.288Z',
        number: 60134
      }
    ],
    total: 59809,
    totalToday: 146,
  };

  test('should handle fetchFeeds.pending', () => {
    const action = { type: fetchFeeds.pending.type };
    const expectedState = { ...initialState, isLoading: true, error: null };
    const newState = feedsReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  test('should handle fetchFeeds.fulfilled', () => {
    const action = { type: fetchFeeds.fulfilled.type, payload: mockFeedsOrders };
    const expectedState = {
      ...initialState,
      orders: mockFeedsOrders.orders,
      total: mockFeedsOrders.total,
      totalToday: mockFeedsOrders.totalToday,
      isLoading: false,
    };
    const newState = feedsReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  test('should handle fetchFeeds.rejected', () => {
    const errorMessage = 'Network Error';
    const action = { type: fetchFeeds.rejected.type, payload: errorMessage };
    const expectedState = { ...initialState, isLoading: false, error: errorMessage };
    const newState = feedsReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
});
