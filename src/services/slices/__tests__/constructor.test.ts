import constructorReducer from '../constructorSlice';
import {
  initialState,
  createOrder,
  addIngredient,
  removeIngredient,
  clearConstructor,
  resetOrderModal,
  moveIngredient
} from '../constructorSlice';
import type { TOrder } from '../../../utils/types';

describe('Тестирование редьюсера слайса constructor', () => {

  test('должен возвращать начальное состояние при инициализации (UNKNOWN экшен)', () => {

    const result = constructorReducer(undefined, { type: 'UNKNOWN' });

    // Редьюсер должен подставит дефолтный initialState
    expect(result).toEqual(initialState);
  });

  test('должен обрабатывать экшен fetchIngredients.pending', () => {
    // Имитируем запуск запроса
    const action = { type: createOrder.pending.type };
    const result = constructorReducer(initialState, action);

    expect(result).toEqual({
      bun: null,
      ingredients: [],
      orderRequest: true,
      orderModalData: null,
      error: null,
    });
  });

  test('должен обрабатывать экшен createOrder.fulfilled', () => {

    const mockOrder: TOrder = {
      _id: '6adb4de4617f04001bceba22',
      status: 'done',
      name: 'Космический бургер',
      createdAt: '2026-10-23T12:00:00.000Z',
      updatedAt: '2026-10-23T12:05:00.000Z',
      number: 9999,
      ingredients: ['11', '22'],
    };
    const action = { type: createOrder.fulfilled.type, payload: mockOrder };

    //Передаем ингредиенты
    const result = constructorReducer(
      {...initialState,
         orderRequest: true,
         bun: { _id: '11' } as any,
         ingredients: [{ _id: '22' }] as any,
      }, action);

    expect(result.orderRequest).toBe(false); // Загрузка выключилась
    expect(result.orderModalData).toEqual(mockOrder); // Данные заказа сохранились
    expect(result.bun).toBeNull(); // Конструктор очистился
    expect(result.ingredients).toHaveLength(0); // Начинки стёрлись
  });

  test('должен обрабатывать экшен createOrder.rejected', () => {
    const action = { type: createOrder.rejected.type, error: { message: 'Ошибка сети или сервера' } };
    const result = constructorReducer({ ...initialState, orderRequest: true }, action);

    expect(result.orderRequest).toBe(false);
    expect(result.error).toBe('Ошибка сети или сервера');
  });



  //Простые экшены без запроса

  test('должен добавлять булку в стейт', () => {
    const mockBun = {
      _id: '1',
      name: 'Краторная булка',
      type: 'bun',
      price: 1000,
      proteins: 10,
      fat: 10,
      carbohydrates: 10,
      calories: 100,
      image: '',
      image_mobile: '',
      image_large: ''
    };

    // addIngredient сам добавит уникальный id
    const action = addIngredient(mockBun);
    const result = constructorReducer(initialState, action);

    // в bun должен появиться объект
    expect(result.bun).toEqual(expect.objectContaining(mockBun));
    expect(result.bun).toHaveProperty('id');
    expect(result.ingredients).toHaveLength(0);
  });

  test('должен добавлять начинку в стейт', () => {
    const mockMain = {
      _id: '2',
      name: 'Филе трески',
      type: 'main',
      price: 500,
      proteins: 10,
      fat: 10,
      carbohydrates: 10,
      calories: 100,
      image: '',
      image_mobile: '',
      image_large: ''
    };

    const action = addIngredient(mockMain);
    const result = constructorReducer(initialState, action);

    expect(result.ingredients[0]).toEqual(expect.objectContaining(mockMain));
    expect(result.ingredients).toHaveLength(1);
    expect(result.bun).toBeNull();
  });

  test('должен удалять ингредиент по id', () => {
    const ingredientId = { _id: '2', id: '123456', name: 'Филе трески', type: 'main', price: 500, proteins: 10, fat: 10, carbohydrates: 10, calories: 100, image: '', image_mobile: '', image_large: '' };

    const customState = { ...initialState, ingredients: [ingredientId] };

    // Удаляем по id
    const action = removeIngredient('123456');
    const result = constructorReducer(customState, action);

    expect(result.ingredients).toHaveLength(0); // Начинка успешно удалилась
  });

  test('должен очищать конструктор при экшене clearConstructor', () => {
    const customState = {
      ...initialState,
      bun: { _id: '1', id: '123456' } as any,
      ingredients: [{ _id: '2', id: '456789' }] as any,
    };

    const result = constructorReducer(customState, clearConstructor());
    expect(result.bun).toBeNull();
    expect(result.ingredients).toHaveLength(0);
  });

  test('должен сбрасывать данные модалки заказа при экшене resetOrderModal', () => {
    const customState = { ...initialState, orderModalData: { number: 7777 } as any };

    const result = constructorReducer(customState, resetOrderModal());
    expect(result.orderModalData).toBeNull();
  });


  test('должен перемещать ингредиенты внутри конструктора', () => {
    const ingredient1 = { _id: '1', id: '123456', name: 'Соус' } as any;
    const ingredient2 = { _id: '2', id: '456789', name: 'Котлета' } as any;

    const stateWithIngredients = { ...initialState, ingredients: [ingredient1, ingredient2] };

    // Перемещаем первый элемент вниз
    const actionDown = moveIngredient({ index: 0, direction: 'down' });
    const resultDown = constructorReducer(stateWithIngredients, actionDown);

    // ingredient1 = index(1), а ingredient2 = index(0)
    expect(resultDown.ingredients[0]).toEqual(ingredient2);
    expect(resultDown.ingredients[1]).toEqual(ingredient1);

    // Перемещяаем ingredient1 обратно вверх
    const actionUp = moveIngredient({ index: 1, direction: 'up' });
    const resultUp = constructorReducer(resultDown, actionUp);

    // Темень ingredient1 = index(0), а ingredient2 = index(1)
    expect(resultUp.ingredients[0]).toEqual(ingredient1);
    expect(resultUp.ingredients[1]).toEqual(ingredient2);
  });

})