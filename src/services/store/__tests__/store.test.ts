import store from '../store'

describe('store', () => {
  it('должен иметь корректное начальное состояние', () => {
    const state = store.getState()
    
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