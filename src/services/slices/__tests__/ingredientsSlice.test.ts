import { fetchIngredients } from '../ingredientsSlice';
import ingredientsReducer from '../ingredientsSlice';
import { TIngredient } from '../../../utils/types';

const ingredientsMockData: Array<TIngredient> = [
  {
    _id: '643d69a5c3f7b9001cfa0945',
    name: 'Соус с шипами Антарианского плоскоходца',
    type: 'sauce',
    proteins: 101,
    fat: 99,
    carbohydrates: 100,
    calories: 100,
    price: 88,
    image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png'
  }
];

describe('Тестирование редьюсера ingredientsSlice', () => {
  const initialState = {
    isLoading: true,
    data: [] as Array<TIngredient>,
    error: null
  };

  describe('Асинхронная функция для получения ингредиентов: fetchIngredients', () => {
    test('Начало запроса', () => {
      const state = ingredientsReducer(
        initialState,
        fetchIngredients.pending('pending')
      );

      expect(state.isLoading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    test('Результат запроса', () => {
      const state = ingredientsReducer(
        initialState,
        fetchIngredients.fulfilled(ingredientsMockData, 'fulfilled')
      );

      expect(state.isLoading).toBeFalsy();
      expect(state.error).toBeNull();
      expect(state.data).toEqual(ingredientsMockData);
    });

    test('Ошибка запроса: fetchIngredients.rejected', () => {
      const error = 'fetchIngredients.rejected';
      const state = ingredientsReducer(
        initialState,
        fetchIngredients.rejected(new Error(error), 'rejected')
      );
      expect(state.isLoading).toBeFalsy();
      expect(state.error?.message).toEqual(error);
    });
  });
});
