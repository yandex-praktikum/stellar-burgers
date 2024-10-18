import { burgerConstructorSlice, addIngredientToConstructor, deleteIngredientFromConstructor, moveIngredientInConstructor } from './burgerConstructorSlice';
import { TIngredient, TConstructorIngredient } from '@utils-types';
import { expect, test } from '@jest/globals';

// Пример булки и начинки с полем id
const bunIngredient: TConstructorIngredient = {
  _id: '643d69a5c3f7b9001cfa093c',
  id: '1', // добавляем id
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: "https://code.s3.yandex.net/react/code/bun-02.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png"
};

const mainIngredient: TConstructorIngredient = {
  _id: '643d69a5c3f7b9001cfa0940',
  id: '2', // добавляем id
  name: 'Отбивная котлета',
  type: 'main',
  proteins: 800,
  fat: 800,
  carbohydrates: 300,
  calories: 2674,
  price: 3000,
  image: "https://code.s3.yandex.net/react/code/meat-04.png",
  image_mobile: "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/meat-04-large.png",
};

// Начальное состояние конструктора
const initialState = {
  bun: null,
  ingredients: [] as TConstructorIngredient[], // Используем TConstructorIngredient
};

// Тесты для конструктора
describe('burgerConstructorSlice', () => {
  
  // Тест на добавление булки
  test('добавляет булку в конструктор', () => {
    const action = addIngredientToConstructor(bunIngredient);
    const state = burgerConstructorSlice.reducer(initialState, action);
    expect(state.bun).toEqual(bunIngredient); // Проверяем, что булка добавлена
  });

  // Тест на добавление начинки
  test('добавляет начинку в конструктор', () => {
    const action = addIngredientToConstructor(mainIngredient);
    const state = burgerConstructorSlice.reducer(initialState, action);
    expect(state.ingredients).toHaveLength(1); // Проверяем, что начинка добавлена
    expect(state.ingredients[0]).toEqual(mainIngredient);
  });

  // Тест на удаление начинки
  test('удаляет ингредиент из конструктора', () => {
    const stateWithIngredient = {
      ...initialState,
      ingredients: [mainIngredient],
    };
    const action = deleteIngredientFromConstructor(mainIngredient.id); // Используем id
    const state = burgerConstructorSlice.reducer(stateWithIngredient, action);
    expect(state.ingredients).toHaveLength(0); // Проверяем, что ингредиент удален
  });

  // Тест на перемещение ингредиентов
  test('перемещает ингредиент в конструкторе', () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: [
        { ...mainIngredient, id: '1', name: 'Начинка 1' },
        { ...mainIngredient, id: '2', name: 'Начинка 2' },
      ],
    };
    const action = moveIngredientInConstructor({ from: 0, to: 1 });
    const state = burgerConstructorSlice.reducer(stateWithIngredients, action);
    
    // Проверяем, что ингредиенты поменялись местами
    expect(state.ingredients[0].name).toBe('Начинка 2');
    expect(state.ingredients[1].name).toBe('Начинка 1');
  });
});
