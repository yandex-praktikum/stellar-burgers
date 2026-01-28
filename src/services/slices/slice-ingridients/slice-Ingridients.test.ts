import { expect, test } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import { ingredientsReducer, fetchIngredients } from './slice-Ingridients';

describe('тест асинхронных экшенов и редьюсеров слайса ингридлиенты', () => {
  const initialState = {
    items: [],
    isLoading: false,
    error: null
  };
  // т.к. тестируем асинхронный код то пользуемся async/await
  test('тест загрузки ингридиентов', async () => {
    const expectedResult = [
      {
        _id: '01',
        name: 'Лучший бургер',
        type: 'bun',
        proteins: 15,
        fat: 25,
        carbohydrates: 12,
        calories: 23,
        price: 233,
        image: 'unknown',
        image_large: 'asd',
        image_mobile: 'asd'
      },
      {
        _id: '02',
        name: 'Соус',
        type: 'main',
        proteins: 5,
        fat: 10,
        carbohydrates: 3,
        calories: 50,
        price: 50,
        image: 'unknown',
        image_large: 'asd',
        image_mobile: 'asd'
      }
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true, data: expectedResult })
      })
    ) as jest.Mock;

    // создаем стор в который будем класть данные, полученные в результате fetchTracks
    const store = configureStore({
      reducer: { ingredients: ingredientsReducer }
    });

    // ожидаем завершение выполнения асинхронного экшена
    await store.dispatch(fetchIngredients());

    const { items } = store.getState().ingredients;
    // и сравниваем их с ожидаемым результатом
    expect(items).toEqual(expectedResult);
  });

  test('pending', () => {
    const state = ingredientsReducer(
      initialState,
      fetchIngredients.pending('', undefined)
    );
    expect(state).toEqual({
      items: [],
      isLoading: true,
      error: null
    });
  });

  test('fulfilled', () => {
    const payload = [
      {
        _id: '01',
        name: 'Bun',
        type: 'bun',
        proteins: 1,
        fat: 1,
        carbohydrates: 1,
        calories: 1,
        price: 1,
        image: 'x',
        image_large: 'x',
        image_mobile: 'x'
      }
    ];
    const state = ingredientsReducer(
      initialState,
      fetchIngredients.fulfilled(payload, '', undefined)
    );
    expect(state).toEqual({
      items: payload,
      isLoading: false,
      error: null
    });
  });

  test('rejected', () => {
    const state = ingredientsReducer(
      initialState,
      fetchIngredients.rejected(
        null,
        '',
        undefined,
        'Failed to load ingredients'
      )
    );
    expect(state).toEqual({
      items: [],
      isLoading: false,
      error: 'Failed to load ingredients'
    });
  });
});
