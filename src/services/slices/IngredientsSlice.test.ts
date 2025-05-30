//These tests check the request ingredients reducers

import { error } from 'console';
import ingredientsSlice, {
  getIngredients,
  TStateIngredients
} from './IngredientsSlice';

//инициализация начального состояния,  будет использоваться редьюсером перед применением экшена. Вынесли в глобальную переменную для удобства использования во всех блоках it
const initialState: TStateIngredients = {
  ingredients: [],
  loading: false,
  error: null
};

//глобальная переменная с тестовым ингредиентом для удобства использования во всех блоках it
const testIngredient = [
  {
    _id: '1',
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
  }
];

describe('Ingredients slice tests', () => {
  it('Test should set loading to true and err to null during pending status', () => {
    const actualState = ingredientsSlice.reducer(
      {
        ...initialState,
        // намеренно добавляем тестовую ошибку в начальное состояние, чтобы проверить её сброс редьюсером
        error: 'Test err'
      },
      //эмулируем вызов action pending, который моделирует начало асинхронной операции, ожидаемой редьюсером
      getIngredients.pending('')
    );

    //проверка, что что редьюсер правильно обновит состояние: загрузка началась (loading: true), ошибка сброшена (error: null), и список ингредиентов по-прежнему пуст
    expect(actualState).toEqual({
      ingredients: [],
      loading: true,
      error: null
    });
  });

  //проверяем, как редьюсер обрабатывает успешное завершение асинхронного запроса на получение ингредиентов
  it('Test should set loading to false and upd ingredients', () => {
    const actualState = ingredientsSlice.reducer(
      {
        ...initialState,
        loading: true //Устанавливаем `loading` в `true`, имитируя активную загрузку данных
      },
      getIngredients.fulfilled(testIngredient, '')
    );

    expect(actualState).toEqual({
      ingredients: testIngredient,
      loading: false,
      error: null
    });
  });

  //тест проверяет как редьюсер обрабатывает неуспешное завершение асинхронного запроса на получение ингредиентов
  it('Test should set loading to false and err to err message', () => {
    //создаем тестовый объект ошибки, который будет использоваться для эмуляции неудачного запроса
    const testErr = new Error('Test err');

    const actualState = ingredientsSlice.reducer(
      {
        ...initialState,
        loading: true //Устанавливаем `loading` в `true`, имитируя активную загрузку данных
      },
      //эмулируем неуспешное завершение запроса с созданной ранее тестовой ошибкой
      getIngredients.rejected(testErr, '')
    );

    //Проверка ОР:
    // - `loading` будет установлено в `false`, так как загрузка завершилась с ошибкой.
    // - `ingredients` останется пустым массивом, так как данные не были загружены.
    // - `error` будет содержать сообщение об ошибке, полученное из объекта ошибки.
    expect(actualState).toEqual({
      ingredients: [],
      loading: false,
      error: 'Test err'
    });
  });
});
