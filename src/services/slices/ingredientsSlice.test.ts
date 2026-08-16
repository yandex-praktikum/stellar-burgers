import {
  ingredientsReducer,
  fetchIngredients
} from './ingredientsSlice';

describe('ingredientsSlice', () => {
  const ingredient = {
    _id: '1',
    name: 'Булка',
    type: 'bun',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 100,
    price: 50,
    image: '',
    image_large: '',
    image_mobile: ''
  };

  it('должен вернуть initialState для неизвестного action', () => {
    expect(
      ingredientsReducer(undefined, { type: 'UNKNOWN' })
    ).toEqual({
      ingredients: [],
      isLoading: false,
      error: null
    });
  });

  it('должен обработать fetchIngredients.pending', () => {
    const state = ingredientsReducer(
      undefined,
      fetchIngredients.pending('', undefined)
    );

    expect(state).toEqual({
      ingredients: [],
      isLoading: true,
      error: null
    });
  });

  it('должен обработать fetchIngredients.fulfilled', () => {
    const state = ingredientsReducer(
      undefined,
      fetchIngredients.fulfilled([ingredient], '', undefined)
    );

    expect(state).toEqual({
      ingredients: [ingredient],
      isLoading: false,
      error: null
    });
  });

  it('должен обработать fetchIngredients.rejected', () => {
    const state = ingredientsReducer(
      undefined,
      fetchIngredients.rejected(
        new Error('Ошибка'),
        '',
        undefined
      )
    );

    expect(state).toEqual({
      ingredients: [],
      isLoading: false,
      error: 'Ошибка'
    });
  });
});
