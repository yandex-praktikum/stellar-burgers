import { v4 as uuidv4 } from 'uuid';
import {
  constructorSlice,
  addIngredient,
  removeIngredient,
  moveIngredient
} from './constructorSlice';
import { TIngredient, TConstructorIngredient } from '../../utils/types';

// Моковые данные ингредиентов для проверки

const testBun = {
  _id: '643d69a5c3f7b9001cfa0941',
  id: '643d69a5c3f7b9001cfa09',
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
};

const testIngredient1 = {
  _id: 'e5e2ae2b4248c744cff2',
  id: 'e5e2ae2b4248c744cff232',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
};

const testIngredient2 = {
  _id: 'e720e1411651dc383e96',
  id: 'e720e1411651dc383e96123',
  name: 'Соус с шипами Антарианского плоскоходца',
  type: 'sauce',
  proteins: 101,
  fat: 99,
  carbohydrates: 100,
  calories: 100,
  price: 88,
  image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png'
};

// initialStates
const reducer = constructorSlice.reducer;

const emptyInitialState = {
  constructorItems: {
    bun: null,
    ingredients: [] as TConstructorIngredient[]
  },
  orderRequest: false,
  orderModalData: null,
  error: null
};

const stateWithIngredients = {
  constructorItems: {
    bun: testBun,
    ingredients: [testIngredient1, testIngredient2] as TConstructorIngredient[]
  },
  orderRequest: false,
  orderModalData: null,
  error: null
};

// Тесты

describe('Тесты слайса конструктора бургера', () => {
  it('Добавление ингредиента, addIngredient', () => {
    const action = addIngredient(testIngredient1);
    const newState = reducer(emptyInitialState, action);

    expect(newState.constructorItems.ingredients).toHaveLength(1);
    expect(newState.constructorItems.ingredients[0]).toMatchObject({
      _id: testIngredient1._id,
      name: testIngredient1.name,
      type: testIngredient1.type
      // сравниваем все свойства, кроме id
    });
  });

  it('Удаление ингредиента, removeIngredient', () => {
    const action = removeIngredient(testIngredient1);
    const newState = reducer(stateWithIngredients, action);

    expect(newState.constructorItems.ingredients).toHaveLength(1);
    expect(newState.constructorItems.ingredients[0]).toEqual(testIngredient2);
  });

  it('Перемещение ингредиента вверх, upIngredient', () => {
    const action = moveIngredient({
      ingredient: testIngredient2,
      moveTo: 'up'
    });

    const newState = reducer(stateWithIngredients, action);

    // Проверка, что ингредиенты поменялись местами
    expect(newState.constructorItems.ingredients[0]).toEqual(testIngredient2);
    expect(newState.constructorItems.ingredients[1]).toEqual(testIngredient1);
  });

  it('Перемещение ингредиента вниз, downIngredient', () => {
    const action = moveIngredient({
      ingredient: testIngredient1,
      moveTo: 'down'
    });

    const newState = reducer(stateWithIngredients, action);

    // Проверка, что ингредиенты поменялись местами
    expect(newState.constructorItems.ingredients[0]).toEqual(testIngredient2);
    expect(newState.constructorItems.ingredients[1]).toEqual(testIngredient1);
  });
});
