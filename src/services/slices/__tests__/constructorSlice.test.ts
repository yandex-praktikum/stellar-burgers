import { TConstructorIngredient } from '../../../utils/types';
import constructorReducer from '../constructorSlice';
import { TConstructorState } from '../../../utils/types';
import {
  addIngredient,
  removeIngredient,
  moveIngredient,
  resetConstructor
} from '../constructorSlice';

describe('Тест для редьюсера конструктора', () => {
  const ingredient1: TConstructorIngredient = {
    _id: '123',
    id: '123',
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

  const ingredient2: TConstructorIngredient = {
    _id: '456',
    id: '456',
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

  const bun: TConstructorIngredient = {
    _id: '789',
    id: '789',
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

  it('должен обрабатывать добавление ингредиента', () => {
    const initialState: TConstructorState = { bun: null, ingredients: [] };
    const newState = constructorReducer(
      initialState,
      addIngredient(ingredient1)
    );
    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0]).toEqual({
      ...ingredient1,
      id: expect.any(String)
    });
  });

  it('должен обрабатывать добавление булки', () => {
    const initialState: TConstructorState = { bun: null, ingredients: [] };
    const newState = constructorReducer(initialState, addIngredient(bun));
    expect(newState.ingredients).toHaveLength(0); // Булки не добавляются в массив ingredients
    expect(newState.bun).toEqual({
      ...bun,
      id: expect.any(String)
    });
  });

  it('должен обрабатывать удаление ингредиента', () => {
    const initialState: TConstructorState = {
      bun: null,
      ingredients: [ingredient1]
    };
    const newState = constructorReducer(
      initialState,
      removeIngredient(ingredient1.id)
    );
    expect(newState.ingredients).toHaveLength(0);
  });

  it('должен обрабатывать изменение порядка ингредиентов', () => {
    const stateWithIngredients: TConstructorState = {
      bun: null,
      ingredients: [ingredient1, ingredient2]
    };

    const action = moveIngredient({ index: 0, upwards: false });
    const newState = constructorReducer(stateWithIngredients, action);

    expect(newState.ingredients[0]).toEqual(ingredient2);
    expect(newState.ingredients[1]).toEqual(ingredient1);
  });

  it('должен обрабатывать сброс конструктора', () => {
    const stateWithIngredients: TConstructorState = {
      bun: bun,
      ingredients: [ingredient1, ingredient2]
    };

    const action = resetConstructor();
    const newState = constructorReducer(stateWithIngredients, action);

    expect(newState.bun).toBeNull();
    expect(newState.ingredients).toHaveLength(0);
  });
});
