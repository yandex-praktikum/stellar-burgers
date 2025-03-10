import orderReducer, {
  closeOrderModalData,
  fetchOrderNumber,
  fetchOrder,
  createOrder,
  IOrderState
} from '../slices/orderSlice';

describe('тест orderSlice reducer', () => {
  const initialState: IOrderState = {
    order: [],
    orderRequest: false,
    orderError: null,
    orderModalData: null,
    isLoadingNumber: true,
    isLoadingOrder: true
  };

  test('начальное состояние', () => {
    expect(orderReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('тест на запрос номера заказа на сервер', () => {
    const action = { type: fetchOrderNumber.pending.type };
    const state = orderReducer(initialState, action);
    expect(state.isLoadingNumber).toBe(true);
  });

  test('тест на успешный запрос номера заказа', () => {
    const mockOrder = { number: 123 }; // Замените на реальные поля вашего заказа
    const action = {
      type: fetchOrderNumber.fulfilled.type,
      payload: mockOrder
    };
    const state = orderReducer(initialState, action);
    expect(state.isLoadingNumber).toBe(false);
    expect(state.orderModalData).toEqual(mockOrder);
  });

  test('тест на ошибку номера заказа', () => {
    const action = { type: fetchOrderNumber.rejected.type };
    const state = orderReducer(initialState, action);
    expect(state.isLoadingNumber).toBe(false);
  });

  test('тест на запрос заказа на сервер', () => {
    const action = { type: createOrder.pending.type };
    const state = orderReducer(initialState, action);
    expect(state.orderRequest).toBe(true);
  });

  test('тест на успешное создание заказа', () => {
    const mockOrder = { number: 123 }; // Замените на реальные поля вашего заказа
    const action = {
      type: createOrder.fulfilled.type,
      payload: { order: mockOrder, name: 'Test Order' }
    };
    const state = orderReducer(initialState, action);
    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toEqual(mockOrder);
  });

  test('тест на ошибку создания заказа', () => {
    const action = { type: createOrder.rejected.type };
    const state = orderReducer(initialState, action);
    expect(state.orderRequest).toBe(false);
  });

  test('тест на работу модалки', () => {
    const stateWithModal = {
      ...initialState,
      orderModalData: {
        _id: '123some-id',
        number: 123,
        status: 'done',
        name: 'Test Order',
        createdAt: '2025-03-04T18:47:03.239Z',
        updatedAt: '2025-03-04T18:47:04.011Z',
        price: 1200,
        ingredients: []
      }
    };
    const action = closeOrderModalData();
    const stateAfter = orderReducer(stateWithModal, action);
    expect(stateAfter.orderModalData).toBeNull();
    expect(stateAfter.orderRequest).toBe(false);
  });

  test('тест на ошибку', () => {
    const action = {
      type: fetchOrder.rejected.type,
      error: { message: 'Error' }
    };
    const state = orderReducer(initialState, action);
    expect(state.isLoadingOrder).toBe(false);
    expect(state.orderError).toEqual(action.error);
  });
});
