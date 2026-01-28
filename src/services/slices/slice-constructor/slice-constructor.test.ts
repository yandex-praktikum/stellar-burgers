import { describe, expect, test, jest } from '@jest/globals';

jest.mock('@reduxjs/toolkit', () => {
  const actual =
    jest.requireActual<typeof import('@reduxjs/toolkit')>('@reduxjs/toolkit');
  return { ...actual, nanoid: () => 'test-id' };
});

import {
  constructorReducer,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from './slice-constructor';
import { placeOrder } from '../slice-order/slice-order';

const getInitialState = () => constructorReducer(undefined, { type: '@@init' });

const bun = {
  _id: 'bun-1',
  name: 'Bun',
  type: 'bun',
  proteins: 1,
  fat: 1,
  carbohydrates: 1,
  calories: 1,
  price: 100,
  image: 'bun.png',
  image_large: 'bun-lg.png',
  image_mobile: 'bun-m.png'
};

const main = {
  _id: 'main-1',
  name: 'Main',
  type: 'main',
  proteins: 2,
  fat: 2,
  carbohydrates: 2,
  calories: 2,
  price: 50,
  image: 'main.png',
  image_large: 'main-lg.png',
  image_mobile: 'main-m.png'
};

describe('слайс конструктора редьюсеры', () => {
  test('addIngredient adds bun as bun', () => {
    const state = constructorReducer(getInitialState(), addIngredient(bun));
    expect(state.bun).toEqual({ ...bun, id: 'test-id' });
    expect(state.ingredients).toHaveLength(0);
  });

  test('addIngredient adds non-bun to ingredients', () => {
    const state = constructorReducer(getInitialState(), addIngredient(main));
    expect(state.bun).toBeNull();
    expect(state.ingredients).toEqual([{ ...main, id: 'test-id' }]);
  });

  test('removeIngredient removes by id', () => {
    const startState = {
      bun: null,
      ingredients: [
        { ...main, id: 'id-1' },
        { ...main, id: 'id-2', _id: 'main-2' }
      ]
    };
    const state = constructorReducer(startState, removeIngredient('id-1'));
    expect(state.ingredients).toEqual([{ ...main, id: 'id-2', _id: 'main-2' }]);
  });

  test('moveIngredient reorders items', () => {
    const startState = {
      bun: null,
      ingredients: [
        { ...main, id: 'id-1', _id: 'm1' },
        { ...main, id: 'id-2', _id: 'm2' },
        { ...main, id: 'id-3', _id: 'm3' }
      ]
    };
    const state = constructorReducer(
      startState,
      moveIngredient({ fromIndex: 0, toIndex: 2 })
    );
    expect(state.ingredients.map((i) => i.id)).toEqual([
      'id-2',
      'id-3',
      'id-1'
    ]);
  });

  test('clearConstructor resets bun and ingredients', () => {
    const startState = {
      bun: { ...bun, id: 'bun-id' },
      ingredients: [{ ...main, id: 'id-1' }]
    };
    const state = constructorReducer(startState, clearConstructor());
    expect(state.bun).toBeNull();
    expect(state.ingredients).toEqual([]);
  });

  test('placeOrder.fulfilled clears constructor', () => {
    const startState = {
      bun: { ...bun, id: 'bun-id' },
      ingredients: [{ ...main, id: 'id-1' }]
    };
    const order = {
      _id: 'order-1',
      status: 'done',
      name: 'Test order',
      createdAt: '2002-01-25T00:00:00.000Z',
      updatedAt: '2002-01-25T00:00:00.000Z',
      number: 1,
      ingredients: [bun._id, main._id]
    };
    const action = placeOrder.fulfilled(
      { success: true, name: 'order', order },
      '',
      []
    );
    const state = constructorReducer(startState, action);
    expect(state.bun).toBeNull();
    expect(state.ingredients).toEqual([]);
  });
});
