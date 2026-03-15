import reducer, { fetchIngredients } from './ingredientsSlice';
import { TIngredient } from '../../../utils/types';

describe('ingredients slice', () => {
  const initialState = {
    ingredients: [],
    loading: false,
    error: null
  };

  const mockIngredients: TIngredient[] = [
    {
      _id: '1',
      name: 'Ингредиент 1',
      type: 'main',
      proteins: 1,
      fat: 1,
      carbohydrates: 1,
      calories: 1,
      price: 100,
      image: '',
      image_mobile: '',
      image_large: ''
    }
  ];

  it('должен устанавливать loading: true при fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = reducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен записывать ингредиенты и loading: false при fetchIngredients.fulfilled', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const state = reducer({ ...initialState, loading: true }, action);

    expect(state.loading).toBe(false);
    expect(state.ingredients).toEqual(mockIngredients);
  });

  it('должен записывать ошибку и loading: false при fetchIngredients.rejected', () => {
    const errorText = 'Ошибка загрузки';
    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: errorText }
    };
    const state = reducer({ ...initialState, loading: true }, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorText);
    expect(state.ingredients).toHaveLength(0);
  });
});
