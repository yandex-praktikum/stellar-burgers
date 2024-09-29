import { configureStore } from '@reduxjs/toolkit';
import {
  getIngredientsList,
  ingredientsSelector,
  ingredientsSliceReducer,
  ingredientsStateSelector,
  initialState,
  isLoadingSelector
} from './ingredientsSlice';

const ingredientsData = {
  ingredients: [
    {
      _id: '643d69a5c3f7b9001cfa0941',

      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      __v: 0
    },
    {
      _id: '643d69a5c3f7b9001cfa093e',
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
      __v: 0
    }
  ],
  loading: false,
  error: null
};

const testStore = () =>
  configureStore({
    reducer: {
      ingredients: ingredientsSliceReducer
    }
  });

describe('ingredientsSlice', () => {
  test('initialState', () => {
    const store = testStore();
    expect(store.getState().ingredients).toEqual(initialState);
  });

  describe('selectors', () => {
    test('ingredientsSelector', () => {
      const state = {
        ingredients: ingredientsData
      };

      const selectedIngredients = ingredientsSelector(state);
      expect(selectedIngredients).toEqual(ingredientsData.ingredients);
    });

    test('isLoadingSelector', () => {
      const state = {
        ingredients: {
          loading: true,
          ingredients: [],
          error: null
        }
      };
      const isLoading = isLoadingSelector(state);
      expect(isLoading).toBe(true);
    });

    test('ingredientsStateSelector', () => {
      const state = {
        ingredients: ingredientsData
      };
      const selectedState = ingredientsStateSelector(state);
      expect(selectedState).toEqual(ingredientsData);
    });
  });

  describe('ingredients extraReducers', () => {
    test('pending', () => {
      const store = testStore();
      store.dispatch({ type: getIngredientsList.pending.type });

      const state = store.getState().ingredients;
      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
    });

    test('error', () => {
      const store = testStore();
      const errorMessage = 'error';
      store.dispatch({
        type: getIngredientsList.rejected.type,
        error: { message: errorMessage }
      });

      const state = store.getState().ingredients;
      expect(state.loading).toBe(true);
      expect(state.error).toBe(errorMessage);
    });

    test('fulfilled', () => {
      const store = testStore();
      store.dispatch({
        type: getIngredientsList.fulfilled.type,
        payload: ingredientsData.ingredients
      });

      const state = store.getState().ingredients;
      expect(state.loading).toBe(false);
      expect(state.ingredients).toEqual(ingredientsData.ingredients);
    });
  });
});
