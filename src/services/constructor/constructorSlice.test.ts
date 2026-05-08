import { stat } from 'fs';
import reducer, {
  initialState,
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor
} from './constructorSlice';

const bun = {
  _id: '1',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02.png'
};

const ingredient1 = {
  _id: '1',
  id: 'uuid-1',
  name: 'test ingredient 1',
  type: 'main',
  proteins: 1,
  fat: 1,
  carbohydrates: 1,
  calories: 1,
  price: 1,
  image: '',
  image_mobile: '',
  image_large: ''
};
const ingredient2 = {
  _id: '2',
  id: 'uuid-2',
  name: 'test ingredient 2',
  type: 'main',
  proteins: 2,
  fat: 2,
  carbohydrates: 2,
  calories: 2,
  price: 2,
  image: '',
  image_mobile: '',
  image_large: ''
};

describe('constructorSlice reducer', () => {
  test('Возвращает начальное состояние', () => {
    const state = reducer(undefined, { type: 'TEST_ACTION' });
    expect(state).toEqual(initialState);
  });
  test('Обрабатывает addBun - устанавливает булку в слот для булки, ингредиенты пустые', () => {
    const state = reducer(initialState, addBun(bun));
    expect(state.bun).toEqual(bun);
    expect(state.ingredients).toEqual([]);
  });
  test('Обрабатывает addIngredient - добавляет ингредиент в список ингредиентов, булки пустые', () => {
    const state = reducer(initialState, addIngredient(ingredient1));
    expect(state.ingredients).toEqual([ingredient1]);
    expect(state.bun).toBeNull();
  });
  test('Обрабатывает removeIngredient - удаляет ингредиент по id', () => {
    const prevState = {
      bun: null,
      ingredients: [ingredient1, ingredient2]
    };
    const state = reducer(prevState, removeIngredient('uuid-1'));
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients).toEqual([ingredient2]);
  });
  test('Обрабатывает moveIngredientUp - перемещает нижний ингредиент вверх', () => {
    const prevState = {
      bun: null,
      ingredients: [ingredient1, ingredient2]
    };
    const state = reducer(prevState, moveIngredientUp(1));
    expect(state.ingredients).toEqual([ingredient2, ingredient1]);
  });
  test('Обрабатывает moveIngredientDown - перемещает верхний ингредиент вниз', () => {
    const prevState = {
      bun: null,
      ingredients: [ingredient1, ingredient2]
    };
    const state = reducer(prevState, moveIngredientDown(0));
    expect(state.ingredients).toEqual([ingredient2, ingredient1]);
  });
  test('Обрабатывает clearConstructor - очищает конструктор', () => {
    const prevState = {
      bun,
      ingredients: [ingredient1, ingredient2]
    };
    const state = reducer(prevState, clearConstructor());
    expect(state).toEqual(initialState);
  });
});
