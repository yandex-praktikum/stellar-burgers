import {
    initialState,
    ingredientsReducer,
    fetchIngredients
  } from './ingridientsSlice';
  
  describe('ingredientsSlice reducer tests', () => {
    const mockIngredients = [
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        id: 'testIdBun'
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
        image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        id: 'testIdMain'
      },
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
        image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
        id: 'testIdSauce'
      }
    ];
  
    test('Обработка экшена fetchIngredients.pending', () => {
      const action = { type: fetchIngredients.pending.type };
      const expectedState = { ...initialState, isLoad: true };
      const newState = ingredientsReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });
  
    test('Обработка экшена fetchIngredients.rejected', () => {
      const action = {
        type: fetchIngredients.rejected.type,
        error: { message: 'Failed to fetch ingredients' }
      };
      const expectedState = {
        ...initialState,
        isLoad: false,
        error: 'Failed to fetch ingredients'
      };
      const newState = ingredientsReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });
  
    test('Обработка экшена fetchIngredients.fulfilled', () => {
      const action = {
        type: fetchIngredients.fulfilled.type,
        payload: mockIngredients
      };
      const expectedState = {
        ...initialState,
        isLoad: false,
        items: mockIngredients
      };
      const newState = ingredientsReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });
  });

  