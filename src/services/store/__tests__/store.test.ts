import store from '../store'

describe('store', () => {
  it('должен возвращать корректное начальное состояние при неизвестном экшене', () => {
    // Вызываем dispatch с экшеном, который не обрабатывается ни одним редьюсером
    const action = { type: 'UNKNOWN_ACTION' }
    store.dispatch(action)
    const state = store.getState()
    
    // Проверяем, что состояние соответствует начальному
    expect(state).toEqual({
      ingredientsState: {
        ingredients: [],
        selectedIngredient: null,
        loading: false,
        error: null
      },
      burgerConstructorState: {
        constructorItems: {
          bun: null,
          ingredients: []
        }
      },
      ordersState: {
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
      },
      userState: {
        user: null,
        isLoading: false,
        isChecked: false,
        error: null
      }
    })
  })
}) 