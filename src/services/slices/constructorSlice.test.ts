import {
  constructorReducer,
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor
} from './constructorSlice';

describe('constructorSlice', () => {
  const bun = {
    _id: '1',
    name: 'Булка',
    type: 'bun',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 100,
    price: 50,
    image: '',
    image_large: '',
    image_mobile: ''
  };

  beforeAll(() => {
  Object.defineProperty(global, 'crypto', {
    value: {
      randomUUID: () => 'test-id'
    }
  });
});

  it('должен вернуть initialState для неизвестного action', () => {
    expect(constructorReducer(undefined, { type: 'UNKNOWN' })).toEqual({
      bun: null,
      ingredients: []
    });
  });

  it('должен обработать addBun', () => {
    expect(constructorReducer(undefined, addBun(bun))).toEqual({
      bun,
      ingredients: []
    });
  });

  it('должен обработать addIngredient', () => {
    const ingredient = {
      _id: '2',
      name: 'Котлета',
      type: 'main',
      proteins: 20,
      fat: 10,
      carbohydrates: 5,
      calories: 150,
      price: 80,
      image: '',
      image_large: '',
      image_mobile: ''
    };

    const state = constructorReducer(undefined, addIngredient(ingredient));

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toMatchObject(ingredient);
    expect(state.ingredients[0].id).toBe('test-id');
  });

  it('должен обработать removeIngredient', () => {
    const state = {
      bun: null,
      ingredients: [
        {
          _id: '1',
          id: 'id-1',
          name: 'Соус',
          type: 'sauce',
          proteins: 1,
          fat: 1,
          carbohydrates: 1,
          calories: 1,
          price: 10,
          image: '',
          image_large: '',
          image_mobile: ''
        }
      ]
    };

    expect(constructorReducer(state, removeIngredient('id-1'))).toEqual({
      bun: null,
      ingredients: []
    });
  });

  it('должен обработать moveIngredientUp', () => {
    const state = {
      bun: null,
      ingredients: [
        {
          _id: '1',
          id: '1',
          name: 'Первый',
          type: 'main',
          proteins: 1,
          fat: 1,
          carbohydrates: 1,
          calories: 1,
          price: 1,
          image: '',
          image_large: '',
          image_mobile: ''
        },
        {
          _id: '2',
          id: '2',
          name: 'Второй',
          type: 'main',
          proteins: 1,
          fat: 1,
          carbohydrates: 1,
          calories: 1,
          price: 1,
          image: '',
          image_large: '',
          image_mobile: ''
        }
      ]
    };

    const result = constructorReducer(state, moveIngredientUp(1));

    expect(result.ingredients[0].id).toBe('2');
    expect(result.ingredients[1].id).toBe('1');
  });

  it('должен обработать moveIngredientDown', () => {
    const state = {
      bun: null,
      ingredients: [
        {
          _id: '1',
          id: '1',
          name: 'Первый',
          type: 'main',
          proteins: 1,
          fat: 1,
          carbohydrates: 1,
          calories: 1,
          price: 1,
          image: '',
          image_large: '',
          image_mobile: ''
        },
        {
          _id: '2',
          id: '2',
          name: 'Второй',
          type: 'main',
          proteins: 1,
          fat: 1,
          carbohydrates: 1,
          calories: 1,
          price: 1,
          image: '',
          image_large: '',
          image_mobile: ''
        }
      ]
    };

    const result = constructorReducer(state, moveIngredientDown(0));

    expect(result.ingredients[0].id).toBe('2');
    expect(result.ingredients[1].id).toBe('1');
  });

  it('должен обработать clearConstructor', () => {
    const state = {
      bun,
      ingredients: [
        {
          _id: '2',
          id: '1',
          name: 'Котлета',
          type: 'main',
          proteins: 20,
          fat: 10,
          carbohydrates: 5,
          calories: 150,
          price: 80,
          image: '',
          image_large: '',
          image_mobile: ''
        }
      ]
    };

    expect(constructorReducer(state, clearConstructor())).toEqual({
      bun: null,
      ingredients: []
    });
  });
});
