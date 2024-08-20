import { describe, expect, it } from '@jest/globals';
import {
  initialState,
  addIngredient,
  deleteIngredient,
  moveIngredient,
  constructorReducer
} from './constructorSlice';

describe('тест конструктора', () => {
  const testState = {
    bun: null,
    ingredients: [
      {
        _id: '643d69a5c3f7b9001cfa0942',
        name: 'Соус Spicy-X',
        type: 'sauce',
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
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
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      }
    ]
  };

  it('добавление игредиента', () => {
    const newIngredient = {
      __v: 0,
      _id: '643d69a5c3f7b9001cfa0949',
      name: 'Мини-салат Экзо-Плантаго',
      type: 'main',
      proteins: 1,
      fat: 2,
      carbohydrates: 3,
      calories: 6,
      price: 4400,
      image: 'https://code.s3.yandex.net/react/code/salad.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/salad-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/salad-large.png'
    };

    const addState = constructorReducer(
      initialState,
      addIngredient(newIngredient)
    );
    expect(addState.ingredients).toHaveLength(1);
    const noId = (obj: Record<string, any>) => {
      const { id, ...rest } = obj;
      return rest;
    };
    expect(noId(addState.ingredients[0])).toEqual(noId(newIngredient));
  });

  it('удаление игридиента', () => {
    const newIngredient = {
        __v: 0,
        _id: '643d69a5c3f7b9001cfa0949',
        name: 'Мини-салат Экзо-Плантаго',
        type: 'main',
        proteins: 1,
        fat: 2,
        carbohydrates: 3,
        calories: 6,
        price: 4400,
        image: 'https://code.s3.yandex.net/react/code/salad.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/salad-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/salad-large.png',
      };
      const deleteState = constructorReducer(
        initialState,
        deleteIngredient(newIngredient) 
      );
      expect(deleteState.ingredients).toHaveLength(0);
      expect(deleteState.ingredients.some((item) => item._id === newIngredient._id)).toBe(false);
  });


    it('перемещение игредиента', () => {
        const ingredientMove = {
            ...initialState,
            ingredients: [
                {
                    _id: '643d69a5c3f7b9001cfa0942',
                    name: 'Соус Spicy-X',
                    type: 'sauce',
                    proteins: 30,
                    fat: 20,
                    carbohydrates: 40,
                    calories: 30,
                    price: 90,
                    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
                    image_mobile:
                        'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
                    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
                    id: 'ingredient-1'
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
                    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
                    id: 'ingredient-2'
                }
            ] 

        } 
        const idToMove = ingredientMove.ingredients[1].id
        const direction = 'up'
    
        const moveState = constructorReducer(
          ingredientMove,
          moveIngredient({ id: idToMove, direction })
        );

        expect(moveState.ingredients[0].id).toBe(idToMove)
    });

  })




