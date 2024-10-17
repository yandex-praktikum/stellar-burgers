import { ordersSlice, fetchOrders, retrieveOrderByNumber, clearOrders } from './ordersHistorySlice';

describe('ordersSlice', () => {
  const initialState = {
    orderDetails: null,
    loading: false,
    orderClaim: false,
    orderError: null,
    orderId: null
  };

  test('устанавливает loading при запросе создания заказа', () => {
    const action = { type: fetchOrders.pending.type };
    const state = ordersSlice.reducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.orderClaim).toBe(true);
    expect(state.orderError).toBeNull();
  });

  test('успешно создает заказ', () => {
    const action = { type: fetchOrders.fulfilled.type, payload: { order: { id: '1', number: '12345' } } };
    const state = ordersSlice.reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.orderDetails).toEqual({ id: '1', number: '12345' });
    expect(state.orderClaim).toBe(false);
  });

  test('обрабатывает ошибку при создании заказа', () => {
    const action = { type: fetchOrders.rejected.type, error: { message: 'Ошибка создания заказа' } };
    const state = ordersSlice.reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.orderError).toBe('Ошибка создания заказа');
  });

  test('запрашивает детали заказа по номеру', () => {
    const action = { type: retrieveOrderByNumber.fulfilled.type, payload: { orders: [{ id: '1', number: '12345' }] } };
    const state = ordersSlice.reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.orderDetails).toEqual({ id: '1', number: '12345' });
  });

  test('очищает данные заказа', () => {
    const action = clearOrders();
    const state = ordersSlice.reducer({ ...initialState, orderDetails: { id: '1', number: '12345' } }, action);
    expect(state.orderDetails).toBeNull();
  });
});
