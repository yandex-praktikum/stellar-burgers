import {
  ingredientsSlice,
  IngredientsThunk,
  initialStateIngredients
} from '@slices';
import { testBun, testIngredient } from './fixtures';

describe('Ingredients slice', () => {
  describe('Async reducer', () => {
    it('should handle pending state', () => {
      const action = { type: IngredientsThunk.pending.type };
      const newState = ingredientsSlice.reducer(
        initialStateIngredients,
        action
      );
      expect(newState.loading).toBe(true);
      expect(newState.error).toBeNull();
      expect(newState.ingredients).toHaveLength(0);
    });

    it('should handle fulfilled state', () => {
      const mockIngredients = [testBun, testIngredient];
      const action = {
        type: IngredientsThunk.fulfilled.type,
        payload: mockIngredients
      };
      const newState = ingredientsSlice.reducer(
        initialStateIngredients,
        action
      );

      expect(newState.loading).toBe(false);
      expect(newState.error).toBeNull();
      expect(newState.ingredients).toEqual(mockIngredients);
    });

    it('should handle rejected state', () => {
      const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const action = {
        type: IngredientsThunk.rejected.type,
        error: { message: 'Error occurred' }
      };
      const newState = ingredientsSlice.reducer(
        initialStateIngredients,
        action
      );

      expect(newState.loading).toBe(false);
      expect(newState.error).toBe('Error occurred');
      expect(newState.ingredients).toHaveLength(0);
      expect(spy).toHaveBeenCalledWith(
        'IngredientsThunk rejected:',
        'Error occurred'
      );

      spy.mockRestore();
    });
  });
});
