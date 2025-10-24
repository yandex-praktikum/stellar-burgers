import ingredientsReducer, { fetchIngredients } from '../ingredients-slice'

describe('ingredients reducer', () => {
  const initialState = {
    ingredients: [],
    selectedIngredient: null,
    loading: false,
    error: null
  }

  it('должен устанавливать loading в true при начале запроса', () => {
    const state = ingredientsReducer(initialState, {
      type: fetchIngredients.pending.type
    })

    expect(state.loading).toBe(true)
    expect(state.error).toBeNull()
  })

  it('должен сохранять ингредиенты при успешном запросе', () => {
    const mockIngredients = [
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
      }
    ]

    const state = ingredientsReducer(initialState, {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    })

    expect(state.ingredients).toEqual(mockIngredients)
    expect(state.loading).toBe(false)
    expect(state.error).toBeNull()
  })

  it('должен сохранять ошибку при неуспешном запросе', () => {
    const errorMessage = 'Failed to fetch ingredients'

    const state = ingredientsReducer(initialState, {
      type: fetchIngredients.rejected.type,
      payload: errorMessage
    })

    expect(state.error).toBe(errorMessage)
    expect(state.loading).toBe(false)
    expect(state.ingredients).toEqual([])
  })
}) 