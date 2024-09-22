import { configureStore } from '@reduxjs/toolkit';
import ingredientReducer, { getAllIngredients } from './ingredientsSlice';
import { TIngredient } from '../../utils/types';

// Мок данных для тестов
const mockIngredients: TIngredient[] = [
  {
    _id: 'e5e2ae2b4248c744cff2',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  },
  {
    _id: 'e720e1411651dc383e96',
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

describe('ingredient slice reducers', () => {
  let store: any;

  // Инициализация магазина перед каждым тестом
  beforeEach(() => {
    store = configureStore({
      reducer: {
        ingredientData: ingredientReducer
      }
    });
  });

  // Тест для getAllIngredients.pending
  it('Тест для getAllIngredients.pending', () => {
    store.dispatch(getAllIngredients.pending('', undefined));
    const state = store.getState().ingredientData;
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  // Тест для getAllIngredients.fulfilled
  it('Тест для getAllIngredients.fulfilled', () => {
    store.dispatch(getAllIngredients.fulfilled(mockIngredients, '', undefined));
    const state = store.getState().ingredientData;
    expect(state.ingredients).toEqual(mockIngredients);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
  });

  // Тест для getAllIngredients.rejected
  it('Тест для getAllIngredients.rejected', () => {
    const error = new Error('Network Error');
    store.dispatch(getAllIngredients.rejected(error, '', undefined));
    const state = store.getState().ingredientData;
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Network Error');
  });
});
