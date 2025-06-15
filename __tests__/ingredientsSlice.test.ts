import { error } from 'console';
import { TIngredient } from '../src/utils/types';
import ingredientsSlice, {
  fetchIngredients
} from './../src/services/slices/ingredientsSlice';

describe('Проверка ingredientsSlice', () => {
  const reducer = ingredientsSlice.reducer;
  const testIngredients: TIngredient[] = [
    {
      _id: '_id1',
      name: 'Ингредиент',
      type: 'sauce',
      proteins: 1,
      fat: 2,
      carbohydrates: 3,
      calories: 4,
      price: 100,
      image: 'imageUrl',
      image_large: 'imageUrl',
      image_mobile: 'imageUrl'
    },
    {
      _id: '_id2',
      name: 'Ингредиент2',
      type: 'sauce',
      proteins: 1,
      fat: 2,
      carbohydrates: 3,
      calories: 4,
      price: 100,
      image: 'imageUrl',
      image_large: 'imageUrl',
      image_mobile: 'imageUrl'
    },
    {
      _id: '_id3',
      name: 'Ингредиент3',
      type: 'sauce',
      proteins: 1,
      fat: 2,
      carbohydrates: 3,
      calories: 4,
      price: 100,
      image: 'imageUrl',
      image_large: 'imageUrl',
      image_mobile: 'imageUrl'
    }
  ];
  const initialState = {
    ingredients: [],
    isLoading: false,
    error: null
  };
  test('Ингредиенты загружаются (pending)', () => {
    const expectedState = {
      ...initialState,
      isLoading: true
    };

    const newState = reducer(initialState, fetchIngredients.pending(''));
    expect(newState).toEqual(expectedState);
  });
  test('Ингредиенты загружаются успешно (fulfilled)', () => {
    const expectedState = {
      ...initialState,
      ingredients: [...testIngredients]
    };

    const newState = reducer(
      initialState,
      fetchIngredients.fulfilled(testIngredients, '')
    );
    expect(newState).toEqual(expectedState);
  });
  test('Ингредиенты не загружаются (rejected)', () => {
    const error = new Error('Test error');
    const expectedState = {
      ...initialState,
      error: error.message
    };

    const newState = reducer(
      initialState,
      fetchIngredients.rejected(error, '')
    );
    expect(newState).toEqual(expectedState);
  });
});
