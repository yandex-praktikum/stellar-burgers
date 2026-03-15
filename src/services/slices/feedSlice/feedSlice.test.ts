import reducer, {
  fetchFeeds,
  fetchOrderByNumber,
  fetchUserOrders,
  clearSelectedOrder
} from './feedSlice';

describe('feedSlice extraReducers', () => {
  const initialState = {
    orders: [],
    userOrders: [],
    total: 0,
    totalToday: 0,
    isLoading: false,
    selectedOrder: null,
    error: null
  };

  const mockOrder = {
    _id: '1',
    number: 123,
    status: 'done',
    name: 'Burger',
    createdAt: '',
    updatedAt: '',
    ingredients: []
  };

  it('должен очищать выбранный заказ через clearSelectedOrder', () => {
    const stateWithOrder = { ...initialState, selectedOrder: mockOrder };
    const state = reducer(stateWithOrder, clearSelectedOrder());
    expect(state.selectedOrder).toBeNull();
  });

  describe('тестирование fetchFeeds (общая лента)', () => {
    it('должен менять isLoading на true при fetchFeeds.pending', () => {
      const state = reducer(initialState, { type: fetchFeeds.pending.type });
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('должен записывать данные при fetchFeeds.fulfilled', () => {
      const payload = {
        orders: [mockOrder],
        total: 100,
        totalToday: 10
      };
      const state = reducer(
        { ...initialState, isLoading: true },
        { type: fetchFeeds.fulfilled.type, payload }
      );
      expect(state.isLoading).toBe(false);
      expect(state.orders).toEqual([mockOrder]);
      expect(state.total).toBe(100);
      expect(state.totalToday).toBe(10);
    });

    it('должен записывать ошибку при fetchFeeds.rejected', () => {
      const state = reducer(
        { ...initialState, isLoading: true },
        { type: fetchFeeds.rejected.type, error: { message: 'Ошибка ленты' } }
      );
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Ошибка ленты');
    });
  });

  describe('тестирование дополнительных запросов', () => {
    it('должен устанавливать selectedOrder при fetchOrderByNumber.fulfilled', () => {
      const state = reducer(initialState, {
        type: fetchOrderByNumber.fulfilled.type,
        payload: { orders: [mockOrder] }
      });
      expect(state.selectedOrder).toEqual(mockOrder);
    });

    it('должен записывать заказы пользователя при fetchUserOrders.fulfilled', () => {
      const state = reducer(
        { ...initialState, isLoading: true },
        { type: fetchUserOrders.fulfilled.type, payload: [mockOrder] }
      );
      expect(state.isLoading).toBe(false);
      expect(state.userOrders).toEqual([mockOrder]);
    });
  });
});
