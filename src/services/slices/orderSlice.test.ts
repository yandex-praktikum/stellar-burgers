import { initialState, newOrderReducer, placeOrder } from './orderSlice';

describe('newOrderSlice reducer tests', () => {
  const mockOrder = {
    success: true,
    name: 'Флюоресцентный люминесцентный бургер',
    order: {
      _id: '67416ffab27b06001c3e9fc3',
      ingredients: [
        {
        _id: '643d69a5c3f7b9001cfa093d',
        name: 'Флюоресцентная булка R2-D3',
        type: 'bun',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile:
        'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
        __v: 0
          },
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
            'https://code.s3.yandex.net/react/code/meat-03-large.png',
        __v: 0
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
        image_mobile:
            'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
        image_large:
            'https://code.s3.yandex.net/react/code/sauce-02-large.png',
        __v: 0
          },
          {
        _id: '643d69a5c3f7b9001cfa093d',
        name: 'Флюоресцентная булка R2-D3',
        type: 'bun',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile:
            'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
        __v: 0
          }
          
      ],
      number: 60185,
      price: 3054
    }
  };

  test('handles placeOrder.pending', () => {
    const action = { type: placeOrder.pending.type };
    const expectedState = { ...initialState, orderRequest: true, error: null };
    const newState = newOrderReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  test('handles placeOrder.rejected', () => {
    const action = { type: placeOrder.rejected.type, payload: 'Error message' };
    const expectedState = {
      ...initialState,
      orderRequest: false,
      error: 'Error message'
    };
    const newState = newOrderReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  test('handles placeOrder.fulfilled', () => {
    const action = { type: placeOrder.fulfilled.type, payload: mockOrder };
    const expectedState = {
      ...initialState,
      orderRequest: false,
      orderModalData: mockOrder.order,
      error: null
    };
    const newState = newOrderReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
});
