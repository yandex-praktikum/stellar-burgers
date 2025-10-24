import ordersReducer, { createOrder } from '../orders-slice'

describe('orders reducer', () => {
  const initialState = {
    feed: {
      orders: [],
      total: 0,
      totalToday: 0
    },
    usersOrders: {
      orders: [],
      total: 0,
      totalToday: 0
    },
    selectedOrder: null,
    justCreatedOrder: null,
    isLoading: false,
    isLoadingSelectedOrder: false,
    error: null
  }

  const mockOrder = {
    number: '12345'
  }

  it('должен устанавливать loading в true при начале запроса', () => {
    const state = ordersReducer(initialState, {
      type: createOrder.pending.type
    })

    expect(state.isLoading).toBe(true)
    expect(state.error).toBeNull()
  })

  it('должен сохранять данные заказа при успешном запросе', () => {
    const state = ordersReducer(initialState, {
      type: createOrder.fulfilled.type,
      payload: mockOrder
    })

    expect(state.justCreatedOrder).toEqual(mockOrder)
    expect(state.isLoading).toBe(false)
    expect(state.error).toBeNull()
  })

  it('должен сохранять ошибку при неуспешном запросе', () => {
    const errorMessage = 'Failed to create order'

    const state = ordersReducer(initialState, {
      type: createOrder.rejected.type,
      payload: errorMessage
    })

    expect(state.error).toBe(errorMessage)
    expect(state.isLoading).toBe(false)
    expect(state.justCreatedOrder).toBeNull()
  })
}) 