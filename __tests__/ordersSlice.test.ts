import ordersSlice, {
  fetchFeeds,
  fetchOrderByNumber,
  fetchOrders
} from './../src/services/slices/ordersSlice';

describe('Тестирование ordersSlice', () => {
  const reducer = ordersSlice.reducer;
  const initialState = {
    feeds: [],
    orders: [],
    total: 0,
    totalToday: 0,
    error: null,
    selectedOrder: null
  };
  const newTestOrderIngredients = ['_id0', '_id1', '_id2', '_id3', '_id0'];
  const testOrders = [
    {
      _id: '1111',
      status: 'success',
      name: 'newOrder1',
      createdAt: 'someDate',
      updatedAt: 'someDate',
      number: 1111,
      ingredients: [...newTestOrderIngredients]
    },
    {
      _id: '2222',
      status: 'success',
      name: 'newOrder2',
      createdAt: 'someDate',
      updatedAt: 'someDate',
      number: 2222,
      ingredients: [...newTestOrderIngredients]
    }
  ];
  describe('Тестирование загрузки заказов в Feeds', () => {
    test('Заказы загружаются в Feeds (pending)', () => {
      const expectedState = {
        ...initialState
      };
      const newState = reducer(initialState, fetchFeeds.pending(''));
      expect(newState).toEqual(expectedState);
    });
    test('Заказы загружаются в Feeds успешно (fulfilled)', () => {
      const expectedState = {
        ...initialState,
        feeds: [...testOrders]
      };
      const testResponse = {
        success: true,
        orders: [...testOrders],
        total: 0,
        totalToday: 0
      };
      const newState = reducer(
        initialState,
        fetchFeeds.fulfilled(testResponse, '')
      );
      expect(newState).toEqual(expectedState);
    });
    test('Заказы не загружаются в Feeds (rejected)', () => {
      const error = new Error('Test error');
      const expectedState = {
        ...initialState,
        error: error.message
      };
      const newState = reducer(initialState, fetchFeeds.rejected(error, ''));
      expect(newState).toEqual(expectedState);
    });
  });
  describe('Тестирование загрузки заказов в Orders', () => {
    test('Заказы загружаются в Orders (pending)', () => {
      const expectedState = {
        ...initialState
      };
      const newState = reducer(initialState, fetchOrders.pending(''));
      expect(newState).toEqual(expectedState);
    });
    test('Заказы загружаются в Orders успешно (fulfilled)', () => {
      const expectedState = {
        ...initialState,
        orders: [...testOrders]
      };
      const newState = reducer(
        initialState,
        fetchOrders.fulfilled(testOrders, '')
      );
      expect(newState).toEqual(expectedState);
    });
    test('Заказы не загружаются в Orders (rejected)', () => {
      const error = new Error('Test error');
      const expectedState = {
        ...initialState,
        error: error.message
      };
      const newState = reducer(initialState, fetchOrders.rejected(error, ''));
      expect(newState).toEqual(expectedState);
    });
  });
  describe('Тестирование поиска заказа по номеру', () => {
    test('Заказ по номеру загружается (pending)', () => {
      const expectedState = {
        ...initialState
      };
      const newState = reducer(
        initialState,
        fetchOrderByNumber.pending('', 1111)
      );
      expect(newState).toEqual(expectedState);
    });
    test('Заказ по номеру загружается успешно (fulfilled)', () => {
      const expectedState = {
        ...initialState,
        selectedOrder: testOrders[0]
      };
      const testResponse = {
        success: true,
        orders: [...testOrders]
      };
      const newState = reducer(
        initialState,
        fetchOrderByNumber.fulfilled(testResponse, '', 1111)
      );
      expect(newState).toEqual(expectedState);
    });
    test('Заказ по номеру не загружается (rejected)', () => {
      const error = new Error('Test error');
      const expectedState = {
        ...initialState,
        error: error.message
      };
      const newState = reducer(
        initialState,
        fetchOrderByNumber.rejected(error, '', 1111)
      );
      expect(newState).toEqual(expectedState);
    });
  });
});
