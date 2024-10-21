import {
  burgerConstructorSlice,
  addIngredientToConstructor,
  deleteIngredientFromConstructor,
  moveIngredientInConstructor,
  initialState
} from './burgerConstructorSlice';
import { expect, test } from '@jest/globals';

// Пример булки и начинки с полем id
const bunIngredient = {
  _id: '643d69a5c3f7b9001cfa093c',
  id: '1',
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

const mainIngredient = {
  _id: '643d69a5c3f7b9001cfa0941',
  id: '2',
  name: 'Отбивная котлета',
  type: 'main',
  proteins: 800,
  fat: 800,
  carbohydrates: 300,
  calories: 2674,
  price: 3000,
  image: 'https://code.s3.yandex.net/react/code/meat-04.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png'
};

// Состояние конструктора с ингредиентами для тестов удаления и перемещения
const constructorState = {
  bun: { ...bunIngredient },
  ingredients: [
    { ...mainIngredient, id: '2', name: 'Отбивная котлета' },
    {
      _id: '643d69a5c3f7b9001cfa0941',
      id: '3',
      name: 'Соус фирменный Space Sauce',
      type: 'sauce',
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 100,
      price: 500,
      image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png'
    }
  ]
};

describe('Проверка слайса burgerConstructorSlice', () => {
  // Проверка добавления булки в конструктор
  test('добавляет булку в конструктор', () => {
    const action = addIngredientToConstructor(bunIngredient);
    const state = burgerConstructorSlice.reducer(initialState, action);

    // Сравниваем объект с использованием expect.objectContaining()
    expect(state.bun).toEqual(
      expect.objectContaining({
        _id: bunIngredient._id,
        calories: bunIngredient.calories,
        carbohydrates: bunIngredient.carbohydrates,
        fat: bunIngredient.fat,
        name: bunIngredient.name,
        price: bunIngredient.price,
        image: bunIngredient.image,
        image_large: bunIngredient.image_large,
        image_mobile: bunIngredient.image_mobile
      })
    );
  });

  // Проверка добавления начинки в конструктор
  test('добавляет начинку в конструктор', () => {
    const action = addIngredientToConstructor(mainIngredient);
    const state = burgerConstructorSlice.reducer(initialState, action);
    expect(state.ingredients).toHaveLength(1); // Проверяем, что начинка добавлена
    expect(state.ingredients[0]).toEqual(
      expect.objectContaining({
        name: 'Отбивная котлета',
        type: 'main',
        price: 3000
      })
    );
  });

  // Проверка удаления ингредиента из конструктора
  test('удаляет ингредиент из конструктора', () => {
    const action = deleteIngredientFromConstructor(
      constructorState.ingredients[0].id
    );
    const state = burgerConstructorSlice.reducer(constructorState, action);
    expect(state.ingredients).toHaveLength(1); // Проверяем, что один ингредиент удален
    expect(state.ingredients[0].name).toBe('Соус фирменный Space Sauce');
  });

  // Тест на перемещение ингредиентов
  test('перемещает ингредиент в конструкторе', () => {
    const action = moveIngredientInConstructor({ from: 1, to: 0 });
    const state = burgerConstructorSlice.reducer(constructorState, action);

    // Проверяем, что ингредиенты поменялись местами
    expect(state.ingredients[0].name).toBe('Соус фирменный Space Sauce');
    expect(state.ingredients[1].name).toBe('Отбивная котлета');
  });
});
