import { describe, it, expect } from '@jest/globals';
import thunk from 'redux-thunk';
import burgerSlice, {
  addIngredient,
  deleteIngredient,
  fetchIngredients,
  initialState,
  moveUp,
  selectConstructorItems
} from './burgerSlice';
import { useSelector } from '../store';
import exp from 'constants';
import * as ingredients from '../../../cypress/fixtures/ingredients.json';

describe('Тестирование работы с конструктором бургеров', () => {
  it('должен добавить ингредиент', () => {
    const previousState = initialState;
    expect(
      burgerSlice.reducer(
        previousState,
        addIngredient({
          _id: '643d69a5c3f7b9001cfa0941',
          name: 'Биокотлета из марсианской Магнолии',
          type: 'main',
          proteins: 420,
          fat: 142,
          carbohydrates: 242,
          calories: 4242,
          price: 424,
          image: 'https://code.s3.yandex.net/react/code/meat-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
        })
      )
    ).toMatchObject({
      constructorItems: {
        bun: null,
        ingredients: [
          {
            _id: '643d69a5c3f7b9001cfa0941',
            name: 'Биокотлета из марсианской Магнолии',
            type: 'main',
            proteins: 420,
            fat: 142,
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: 'https://code.s3.yandex.net/react/code/meat-01.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/meat-01-large.png'
          }
        ]
      },
      allIngredients: [],
      orderModalData: null,
      isLoading: false,
      isError: false,
      errorText: '',
      orderResponse: null,
      modalIsClosed: true
    });
  });
  it('должен удалить ингредиент', () => {
    const previousState = initialState;
    burgerSlice.reducer(
      previousState,
      addIngredient({
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      })
    );
    expect(
      burgerSlice.reducer(
        previousState,
        deleteIngredient({
          payload: {
            _id: '643d69a5c3f7b9001cfa0941'
          }
        })
      )
    ).toMatchObject(initialState);
  });
  it('должен поменять 2 интегрединета местами', () => {
    let previousState = initialState;
    previousState = burgerSlice.reducer(
      previousState,
      addIngredient({
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      })
    );
    previousState = burgerSlice.reducer(
      previousState,
      addIngredient({
        _id: '643d69a5c3f7b9001cfa093e',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
      })
    );
    expect(burgerSlice.reducer(previousState, moveUp(1))).toMatchObject({
      constructorItems: {
        bun: null,
        ingredients: [
          {
            _id: '643d69a5c3f7b9001cfa093e',
            name: 'Филе Люминесцентного тетраодонтимформа',
            type: 'main',
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: 'https://code.s3.yandex.net/react/code/meat-03.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/meat-03-large.png'
          },
          {
            _id: '643d69a5c3f7b9001cfa0941',
            name: 'Биокотлета из марсианской Магнолии',
            type: 'main',
            proteins: 420,
            fat: 142,
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: 'https://code.s3.yandex.net/react/code/meat-01.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/meat-01-large.png'
          }
        ]
      }
    });
  });
  it('Тестирование async actions', () => {
    expect(
      burgerSlice.reducer(undefined, {
        type: fetchIngredients.pending.type,
        payload: {}
      })
    ).toEqual({ ...initialState, isLoading: true, isError: false });
    expect(
      burgerSlice.reducer(undefined, {
        type: fetchIngredients.rejected.type,
        payload: {}
      })
    ).toEqual({ ...initialState, isLoading: false, isError: true });
    expect(
      burgerSlice.reducer(undefined, {
        type: fetchIngredients.fulfilled.type,
        payload: ingredients.data
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      isError: false,
      allIngredients: ingredients.data
    });
  });
});
