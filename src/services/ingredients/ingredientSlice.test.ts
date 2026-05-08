import { ingredientsSlice } from './ingredientsSlice';
import { getIngredients } from './actions';

const reducer = ingredientsSlice.reducer;
const ingredientMock = [
  {
    _id: '1',
    id: 'uuid-1',
    name: 'test ingredient 1',
    type: 'main',
    proteins: 1,
    fat: 1,
    carbohydrates: 1,
    calories: 1,
    price: 1,
    image: '',
    image_mobile: '',
    image_large: ''
  }
];

describe('ingredient reducer', () => {
  test('возвращает initialState по умолчанию', () => {
    const state = reducer(undefined, { type: 'TEST_ACTION' });
    expect(state).toEqual({
      data: [],
      isLoading: false,
      error: null
    });
  });
  test('меняет isLoading ингредиентов на true, очищает ошибку на getIngredients.pending ', () => {
    const prevState = {
      data: [],
      isLoading: false,
      error: 'прошлая ошибка'
    };
    const state = reducer(prevState, getIngredients.pending(''));
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
    expect(state.data).toEqual([]);
  });
  test('меняет isLoading ингредиентов на false, очищает ошибку и записывает данные в стор на getIngredients.fulfilled', () => {
    const prevState = {
      data: [],
      isLoading: true,
      error: ''
    };
    const state = reducer(
      prevState,
      getIngredients.fulfilled(ingredientMock, '')
    );
    expect(state.isLoading).toBe(false);
    expect(state.data).toEqual(ingredientMock);
    expect(state.error).toBeNull;
  });
  test('меняет isLoading ингредиентов на false, записывает ошибку в стор на getIngredients.rejected', () => {
    const prevState = {
      data: [],
      isLoading: true,
      error: null
    };
    const errorMessage = 'ошибка загрузки';
    const state = reducer(
      prevState,
      getIngredients.rejected(new Error(errorMessage), '')
    );
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
    expect(state.data).toEqual([]);
  });
});
