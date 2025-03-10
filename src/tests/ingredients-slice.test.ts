import ingredientsReducer, {
  fetchIngredients,
  IIngredientsState
} from '../slices/ingredientsListSlice';
import { TIngredient } from '@utils-types';

describe('тест ingredientsSlice', () => {
  const initialState: IIngredientsState = {
    isLoading: true,
    error: null,
    data: []
  };

  it('начальное состояние', () => {
    expect(ingredientsReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('тест на запрос ингредиентов на сервер', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('тест на успешное получение ингредиентов', () => {
    const mockData: TIngredient[] = [
      {
        _id: '1',
        name: 'Ingredient 1',
        type: 'main',
        proteins: 10,
        fat: 20,
        carbohydrates: 30,
        calories: 100,
        price: 200,
        image: '',
        image_mobile: '',
        image_large: ''
      },
      {
        _id: '2',
        name: 'Ingredient 2',
        type: 'main',
        proteins: 20,
        fat: 10,
        carbohydrates: 40,
        calories: 150,
        price: 300,
        image: '',
        image_mobile: '',
        image_large: ''
      }
    ];

    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockData
    };

    const state = ingredientsReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.data).toEqual(mockData);
  });

  it('тест на ошибку получения ингредиентов', () => {
    const error = { message: 'Error fetching ingredients' };
    const action = {
      type: fetchIngredients.rejected.type,
      payload: undefined,
      error: { message: error.message }
    };

    const state = ingredientsReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toEqual({ message: error.message });
  });
});
