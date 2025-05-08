import { configureStore } from '@reduxjs/toolkit';
import orderSlice, {
  createOrder,
  fetchOrderNumber,
  fetchOrder,
  orderDataSelector,
  selectOrders,
  selectOrderRequest,
  selectOrderModalData,
  closeOrderModalData,
  IOrderState,
  initialState
} from '../order-slice';
import { orderBurgerApi, getOrderByNumberApi, getOrdersApi } from '@api';
import { TOrder } from '@utils-types';

// Моки для API
jest.mock('@api', () => ({
  orderBurgerApi: jest.fn(),
  getOrderByNumberApi: jest.fn(),
  getOrdersApi: jest.fn()
}));

const mockedOrderBurgerApi = orderBurgerApi as jest.MockedFunction<
  typeof orderBurgerApi
>;
const mockedGetOrderByNumberApi = getOrderByNumberApi as jest.MockedFunction<
  typeof getOrderByNumberApi
>;
const mockedGetOrdersApi = getOrdersApi as jest.MockedFunction<
  typeof getOrdersApi
>;

describe('Слайс заказов', () => {
  const mockOrder: TOrder = {
    _id: '1',
    ingredients: ['ing1', 'ing2'],
    status: 'done',
    name: 'Order 1',
    createdAt: '2023-01-01',
    updatedAt: '2023-01-01',
    number: 1
  };

  const mockOrders: TOrder[] = [
    mockOrder,
    {
      _id: '2',
      ingredients: ['ing3', 'ing4'],
      status: 'pending',
      name: 'Order 2',
      createdAt: '2023-01-02',
      updatedAt: '2023-01-02',
      number: 2
    }
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Возвращение начального состояния', () => {
    expect(orderSlice(undefined, { type: 'unknown' })).toEqual({
      order: [],
      orderRequest: false,
      orderError: null,
      orderModalData: null,
      isLoadingNumber: true,
      isLoadingOrder: true
    });
  });

  describe('Действия', () => {
    it('Обрабатывает закрытие модального окна заказа', () => {
      const initialStateWithModal: IOrderState = {
        ...initialState,
        orderModalData: mockOrder,
        orderRequest: true
      };

      const action = closeOrderModalData();
      const state = orderSlice(initialStateWithModal, action);

      expect(state.orderModalData).toBeNull();
      expect(state.orderRequest).toBe(false);
    });
  });

  describe('Асинхронные операции', () => {
    describe('createOrder', () => {
      it('Обрабатывает состояние pending', () => {
        const action = { type: createOrder.pending.type };
        const state = orderSlice(initialState, action);
        expect(state.orderRequest).toBe(true);
      });

      it('Обрабатывает состояние fulfilled', () => {
        const action = {
          type: createOrder.fulfilled.type,
          payload: { order: mockOrder, name: 'Order 1' }
        };
        const state = orderSlice(initialState, action);
        expect(state.orderRequest).toBe(false);
        expect(state.orderModalData).toEqual(mockOrder);
      });

      it('Обрабатывает состояние rejected', () => {
        const action = { type: createOrder.rejected.type };
        const state = orderSlice(initialState, action);
        expect(state.orderRequest).toBe(false);
      });

      it('Успешное создание заказа', async () => {
        mockedOrderBurgerApi.mockResolvedValue({
          success: true,
          name: 'Order 1',
          order: mockOrder
        });

        const store = configureStore({
          reducer: {
            order: orderSlice
          }
        });

        await store.dispatch(createOrder(['ing1', 'ing2']));

        const state = store.getState().order;
        expect(state.orderRequest).toBe(false);
        expect(state.orderModalData).toEqual(mockOrder);
      });
    });

    describe('fetchOrderNumber', () => {
      it('Обрабатывает состояние pending', () => {
        const action = { type: fetchOrderNumber.pending.type };
        const state = orderSlice(initialState, action);
        expect(state.isLoadingNumber).toBe(true);
      });

      it('Обрабатывает состояние fulfilled', () => {
        const action = {
          type: fetchOrderNumber.fulfilled.type,
          payload: mockOrder
        };
        const state = orderSlice(initialState, action);
        expect(state.isLoadingNumber).toBe(false);
        expect(state.orderModalData).toEqual(mockOrder);
      });

      it('Обрабатывает состояние rejected', () => {
        const action = { type: fetchOrderNumber.rejected.type };
        const state = orderSlice(initialState, action);
        expect(state.isLoadingNumber).toBe(false);
      });

      it('Успешное получение заказа по номеру', async () => {
        mockedGetOrderByNumberApi.mockResolvedValue({
          success: true,
          orders: [mockOrder]
        });

        const store = configureStore({
          reducer: {
            order: orderSlice
          }
        });

        await store.dispatch(fetchOrderNumber(1));

        const state = store.getState().order;
        expect(state.isLoadingNumber).toBe(false);
        expect(state.orderModalData).toEqual(mockOrder);
      });
    });

    describe('fetchOrder', () => {
      it('Обрабатывает состояние pending', () => {
        const action = { type: fetchOrder.pending.type };
        const state = orderSlice(initialState, action);
        expect(state.isLoadingOrder).toBe(true);
        expect(state.orderError).toBeNull();
      });

      it('Обрабатывает состояние fulfilled', () => {
        const action = {
          type: fetchOrder.fulfilled.type,
          payload: mockOrders
        };
        const state = orderSlice(initialState, action);
        expect(state.isLoadingOrder).toBe(false);
        expect(state.orderError).toBeNull();
        expect(state.order).toEqual(mockOrders);
      });

      it('Обрабатывает состояние rejected', () => {
        const error = { message: 'Request failed' };
        const action = {
          type: fetchOrder.rejected.type,
          error
        };
        const state = orderSlice(initialState, action);
        expect(state.isLoadingOrder).toBe(false);
        expect(state.orderError).toEqual(error);
      });

      it('Успешно получает список заказов', async () => {
        mockedGetOrdersApi.mockResolvedValue(mockOrders);

        const store = configureStore({
          reducer: {
            order: orderSlice
          }
        });

        await store.dispatch(fetchOrder());

        const state = store.getState().order;
        expect(state.isLoadingOrder).toBe(false);
        expect(state.order).toEqual(mockOrders);
      });
    });
  });

  describe('Селекторы', () => {
    const mockRootState = {
      order: {
        order: mockOrders,
        orderRequest: false,
        orderError: null,
        orderModalData: mockOrder,
        isLoadingNumber: false,
        isLoadingOrder: false
      },
      feed: {
        items: {
          orders: mockOrders,
          total: 2,
          totalToday: 1,
          success: true
        },
        loading: false,
        error: null
      },
      builder: {} as any,
      ingredients: {} as any,
      user: {} as any
    };

    it('Выбирает все заказы', () => {
      expect(selectOrders(mockRootState)).toEqual(mockOrders);
    });

    it('Выбирает статус запроса заказа', () => {
      expect(selectOrderRequest(mockRootState)).toBe(false);
    });

    it('Выбирает данные модального окна заказа', () => {
      expect(selectOrderModalData(mockRootState)).toEqual(mockOrder);
    });

    describe('orderDataSelector', () => {
      it('Находит заказ в слайсе заказов', () => {
        const selector = orderDataSelector('1');
        expect(selector(mockRootState)).toEqual(mockOrder);
      });

      it('Находит заказ в слайсе ленты заказов', () => {
        const selector = orderDataSelector('2');
        expect(selector(mockRootState)).toEqual(mockOrders[1]);
      });

      it('Возвращает данные модального окна, если заказ не найден', () => {
        const selector = orderDataSelector('3');
        const state = {
          ...mockRootState,
          order: { ...mockRootState.order, order: [] },
          feed: {
            ...mockRootState.feed,
            items: { ...mockRootState.feed.items, orders: [] }
          }
        };
        expect(selector(state)).toEqual(mockOrder);
      });

      it('Возвращает null, если данные не найдены', () => {
        const selector = orderDataSelector('999');
        const state = {
          ...mockRootState,
          order: { ...mockRootState.order, order: [], orderModalData: null },
          feed: {
            ...mockRootState.feed,
            items: { ...mockRootState.feed.items, orders: [] }
          }
        };
        expect(selector(state)).toBeNull();
      });
    });
  });
});
