import constructorReducer, {
  setBun,
  setIngredient,
  removeIngredient,
  moveIngredient
} from '../constructor-slice'
import { TIngredient } from '@utils-types'

describe('constructor reducer', () => {
  const initialState = {
    constructorItems: {
      bun: null,
      ingredients: []
    }
  }

  const mockIngredient: TIngredient = {
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

  it('должен добавлять ингредиент в конструктор', () => {
    const ingredient = { ...mockIngredient, type: 'main', dragId: '123', id: '123' }
    const action = setIngredient(ingredient)
    const state = constructorReducer(initialState, action)

    expect(state.constructorItems.ingredients).toEqual([ingredient])
  })

  it('должен удалять ингредиент из конструктора', () => {
    const ingredient = { ...mockIngredient, type: 'main', dragId: '123', id: '123' }
    const stateWithIngredient = constructorReducer(
      initialState,
      setIngredient(ingredient)
    )

    const state = constructorReducer(
      stateWithIngredient,
      removeIngredient(ingredient.dragId)
    )

    expect(state.constructorItems.ingredients).toEqual([])
  })

  it('должен менять порядок ингредиентов', () => {
    const ingredient1 = { ...mockIngredient, type: 'main', dragId: '123', id: '123' }
    const ingredient2 = { ...mockIngredient, type: 'main', dragId: '456', id: '456' }
    
    let state = constructorReducer(initialState, setIngredient(ingredient1))
    state = constructorReducer(state, setIngredient(ingredient2))

    state = constructorReducer(
      state,
      moveIngredient({ oldIndex: 0, newIndex: 1 })
    )

    expect(state.constructorItems.ingredients).toEqual([ingredient2, ingredient1])
  })
}) 