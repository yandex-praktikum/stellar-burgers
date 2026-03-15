import reducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from './constructorSlice';
import { TIngredient, TConstructorIngredient } from '../../../utils/types';

describe('burgerConstructor slice', () => {
  const initialState = {
    bun: null,
    ingredients: []
  };

  const mockBun: TIngredient = {
    _id: '1',
    name: 'Булка',
    type: 'bun',
    proteins: 10,
    fat: 10,
    carbohydrates: 10,
    calories: 100,
    price: 100,
    image: '',
    image_mobile: '',
    image_large: ''
  };

  const mockMain: TIngredient = {
    _id: '2',
    name: 'Начинка',
    type: 'main',
    proteins: 20,
    fat: 20,
    carbohydrates: 20,
    calories: 200,
    price: 200,
    image: '',
    image_mobile: '',
    image_large: ''
  };

  it('должен добавлять булку (заменяет текущую)', () => {
    const state = reducer(initialState, addIngredient(mockBun));
    expect(state.bun).toEqual(
      expect.objectContaining({ _id: '1', type: 'bun' })
    );
    // Проверяем, что nanoid сгенерировал id
    expect(state.bun).toHaveProperty('id');
  });

  it('должен добавлять ингредиент в начинку', () => {
    const state = reducer(initialState, addIngredient(mockMain));
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0].name).toBe('Начинка');
    expect(state.ingredients[0]).toHaveProperty('id');
  });

  it('должен удалять ингредиент из начинки по id', () => {
    const ingredientWithId: TConstructorIngredient = {
      ...mockMain,
      id: 'unique-id'
    };
    const stateWithItem = { ...initialState, ingredients: [ingredientWithId] };

    const state = reducer(stateWithItem, removeIngredient('unique-id'));
    expect(state.ingredients).toHaveLength(0);
  });

  it('должен изменять порядок ингредиентов (moveIngredient)', () => {
    const item1 = { ...mockMain, id: 'id-1' };
    const item2 = { ...mockMain, id: 'id-2', name: 'Начинка 2' };
    const stateWithItems = { ...initialState, ingredients: [item1, item2] };

    // Перемещаем второй элемент (index 1) на первое место (index 0)
    const state = reducer(
      stateWithItems,
      moveIngredient({ hoverIndex: 0, dragIndex: 1 })
    );

    expect(state.ingredients[0].id).toBe('id-2');
    expect(state.ingredients[1].id).toBe('id-1');
  });

  it('должен очищать конструктор', () => {
    const filledState = {
      bun: { ...mockBun, id: 'b' },
      ingredients: [{ ...mockMain, id: 'm' }]
    };
    const state = reducer(filledState, clearConstructor());
    expect(state).toEqual(initialState);
  });
});
