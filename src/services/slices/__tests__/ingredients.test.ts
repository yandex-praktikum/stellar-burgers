import ingredientsReducer from '../ingredientsSlice';
import { initialState, fetchIngredients } from '../ingredientsSlice';
import type { TIngredient } from '../../../utils/types';

describe('Тестирование редьюсера слайса ingredients', () => {


  test('должен возвращать начальное состояние при инициализации (UNKNOWN экшен)', () => {

    const result = ingredientsReducer(undefined, { type: 'UNKNOWN' });

    // Редьюсер должен подставит дефолтный initialState
    expect(result).toEqual(initialState);
  });

  test('должен обрабатывать экшен fetchIngredients.pending', () => {
    // Имитируем запуск запроса
    const action = { type: fetchIngredients.pending.type };
    const result = ingredientsReducer(initialState, action);

    // Лоадер должен быть true, и ошибка null
    expect(result).toEqual({
      ingredients: [],
      isIngredientsLoading: true,
      ingredientsError: null,
    });
  });

  test('должен обрабатывать экшен fetchIngredients.fulfilled', () => {
    // Как будто вернул сервер
    const mockIngredients: TIngredient[] = [
      {
        _id: "643d69a5c3f7b9001cfa093c",
        type: "bun",
        calories: 420,
        carbohydrates: 53,
        fat: 24,
        image: "https://code.s3.yandex.net/react/code/bun-02.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        name: "Краторная булка N-200i",
        price: 1255,
        proteins: 80
      },
    ];

    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    };

    //Как будто после pending
    const result = ingredientsReducer(
      { ...initialState, isIngredientsLoading: true },
      action
    );

    // Возращать должен список тестовы ингредиентов, лоадер должен быть false, а ошибка null
    expect(result).toEqual({
      ingredients: mockIngredients,
      isIngredientsLoading: false,
      ingredientsError: null,
    });
  });

  test('должен обрабатывать экшен fetchIngredients.rejected', () => {
    // Как будто вернул сервер ошибку
    const mockError = { message: 'Ошибка сети или сервера' };

    const action = {
      type: fetchIngredients.rejected.type,
      error: mockError
    };


    //Как будто после pending
    const result = ingredientsReducer(
      { ...initialState, isIngredientsLoading: true },
      action
    );

    // лоадер должен быть false, а ошибка not null
    expect(result).toEqual({
      ingredients: [],
      isIngredientsLoading: false,
      ingredientsError: 'Ошибка сети или сервера'
    });
  });

});