import reducer, {
  fetchIngredients,
  IngredientsState
} from './ingredientsSlice';
import { mockIngredients } from '../../__mocks__/ingredients';
import * as api from '@api';

// Mock the API module
jest.mock('@api');
const mockedApi = api as jest.Mocked<typeof api>;

describe('ingredientsSlice', () => {
  const initialState: IngredientsState = {
    ingredients: [],
    loading: false,
    error: null
  };

  describe('reducer', () => {
    test('should return initial state', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  });

  describe('fetchIngredients thunk', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('should handle pending state', () => {
      const action = { type: fetchIngredients.pending.type };
      const state = reducer(initialState, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    test('should handle fulfilled state', () => {
      const action = {
        type: fetchIngredients.fulfilled.type,
        payload: mockIngredients
      };
      const state = reducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.ingredients).toEqual(mockIngredients);
      expect(state.error).toBeNull();
    });

    test('should handle rejected state', () => {
      const errorMessage = 'Failed to fetch ingredients';
      const action = {
        type: fetchIngredients.rejected.type,
        payload: errorMessage
      };
      const state = reducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.ingredients).toEqual([]);
    });

    test('should clear previous error on pending', () => {
      const stateWithError: IngredientsState = {
        ingredients: [],
        loading: false,
        error: 'Previous error'
      };

      const action = { type: fetchIngredients.pending.type };
      const state = reducer(stateWithError, action);

      expect(state.error).toBeNull();
    });

    test('should preserve ingredients on error', () => {
      const stateWithIngredients: IngredientsState = {
        ingredients: mockIngredients,
        loading: false,
        error: null
      };

      const action = {
        type: fetchIngredients.rejected.type,
        payload: 'Network error'
      };
      const state = reducer(stateWithIngredients, action);

      expect(state.ingredients).toEqual(mockIngredients);
    });
  });

  describe('fetchIngredients integration', () => {
    test('should fetch ingredients successfully', async () => {
      mockedApi.getIngredientsApi.mockResolvedValue(mockIngredients);

      const dispatch = jest.fn();
      const thunk = fetchIngredients();

      await thunk(dispatch, () => ({}), undefined);

      const { calls } = dispatch.mock;
      expect(calls).toHaveLength(2);
      expect(calls[0][0].type).toBe(fetchIngredients.pending.type);
      expect(calls[1][0].type).toBe(fetchIngredients.fulfilled.type);
      expect(calls[1][0].payload).toEqual(mockIngredients);
    });

    test('should handle fetch error', async () => {
      const errorMessage = 'API Error';
      mockedApi.getIngredientsApi.mockRejectedValue(new Error(errorMessage));

      const dispatch = jest.fn();
      const thunk = fetchIngredients();

      await thunk(dispatch, () => ({}), undefined);

      const { calls } = dispatch.mock;
      expect(calls).toHaveLength(2);
      expect(calls[0][0].type).toBe(fetchIngredients.pending.type);
      expect(calls[1][0].type).toBe(fetchIngredients.rejected.type);
    });
  });
});
