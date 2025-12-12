import reducer, {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor,
  BurgerConstructorState
} from './burgerConstructorSlice';
import { mockBun, mockMain, mockSauce } from '../../__mocks__/ingredients';

describe('burgerConstructorSlice', () => {
  const initialState: BurgerConstructorState = {
    bun: null,
    ingredients: []
  };

  describe('addIngredient', () => {
    test('should add bun to state', () => {
      const action = addIngredient(mockBun);
      const state = reducer(initialState, action);

      expect(state.bun).toBeDefined();
      expect(state.bun?.type).toBe('bun');
      expect(state.bun?.name).toBe(mockBun.name);
      expect(state.bun).toHaveProperty('id');
    });

    test('should replace existing bun when adding new bun', () => {
      const stateWithBun: BurgerConstructorState = {
        bun: { ...mockBun, id: 'old-id' },
        ingredients: []
      };

      const newBun = { ...mockBun, _id: 'new-bun-id', name: 'New Bun' };
      const action = addIngredient(newBun);
      const state = reducer(stateWithBun, action);

      expect(state.bun?.name).toBe('New Bun');
      expect(state.bun?._id).toBe('new-bun-id');
    });

    test('should add main ingredient to ingredients array', () => {
      const action = addIngredient(mockMain);
      const state = reducer(initialState, action);

      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0].type).toBe('main');
      expect(state.ingredients[0]).toHaveProperty('id');
    });

    test('should add sauce ingredient to ingredients array', () => {
      const action = addIngredient(mockSauce);
      const state = reducer(initialState, action);

      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0].type).toBe('sauce');
    });

    test('should add multiple ingredients maintaining order', () => {
      let state = initialState;

      state = reducer(state, addIngredient(mockMain));
      state = reducer(state, addIngredient(mockSauce));
      state = reducer(state, addIngredient(mockMain));

      expect(state.ingredients).toHaveLength(3);
      expect(state.ingredients[0].type).toBe('main');
      expect(state.ingredients[1].type).toBe('sauce');
      expect(state.ingredients[2].type).toBe('main');
    });

    test('should generate unique id for each ingredient', () => {
      let state = initialState;

      state = reducer(state, addIngredient(mockMain));
      state = reducer(state, addIngredient(mockMain));

      expect(state.ingredients[0].id).not.toBe(state.ingredients[1].id);
    });
  });

  describe('removeIngredient', () => {
    test('should remove ingredient by id', () => {
      const ingredientWithId = { ...mockMain, id: 'test-id-123' };
      const stateWithIngredient: BurgerConstructorState = {
        bun: null,
        ingredients: [ingredientWithId]
      };

      const action = removeIngredient('test-id-123');
      const state = reducer(stateWithIngredient, action);

      expect(state.ingredients).toHaveLength(0);
    });

    test('should remove only specified ingredient', () => {
      const ingredient1 = { ...mockMain, id: 'id-1' };
      const ingredient2 = { ...mockSauce, id: 'id-2' };
      const ingredient3 = { ...mockMain, id: 'id-3' };

      const stateWithIngredients: BurgerConstructorState = {
        bun: null,
        ingredients: [ingredient1, ingredient2, ingredient3]
      };

      const action = removeIngredient('id-2');
      const state = reducer(stateWithIngredients, action);

      expect(state.ingredients).toHaveLength(2);
      expect(state.ingredients[0].id).toBe('id-1');
      expect(state.ingredients[1].id).toBe('id-3');
    });

    test('should not modify state if id not found', () => {
      const ingredient = { ...mockMain, id: 'existing-id' };
      const stateWithIngredient: BurgerConstructorState = {
        bun: null,
        ingredients: [ingredient]
      };

      const action = removeIngredient('non-existent-id');
      const state = reducer(stateWithIngredient, action);

      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0].id).toBe('existing-id');
    });
  });

  describe('moveIngredientUp', () => {
    test('should move ingredient up in array', () => {
      const ingredient1 = { ...mockMain, id: 'id-1', name: 'First' };
      const ingredient2 = { ...mockSauce, id: 'id-2', name: 'Second' };
      const ingredient3 = { ...mockMain, id: 'id-3', name: 'Third' };

      const stateWithIngredients: BurgerConstructorState = {
        bun: null,
        ingredients: [ingredient1, ingredient2, ingredient3]
      };

      const action = moveIngredientUp(1);
      const state = reducer(stateWithIngredients, action);

      expect(state.ingredients[0].name).toBe('Second');
      expect(state.ingredients[1].name).toBe('First');
      expect(state.ingredients[2].name).toBe('Third');
    });

    test('should not move first ingredient up', () => {
      const ingredient1 = { ...mockMain, id: 'id-1', name: 'First' };
      const ingredient2 = { ...mockSauce, id: 'id-2', name: 'Second' };

      const stateWithIngredients: BurgerConstructorState = {
        bun: null,
        ingredients: [ingredient1, ingredient2]
      };

      const action = moveIngredientUp(0);
      const state = reducer(stateWithIngredients, action);

      expect(state.ingredients[0].name).toBe('First');
      expect(state.ingredients[1].name).toBe('Second');
    });

    test('should handle negative index gracefully', () => {
      const ingredient = { ...mockMain, id: 'id-1' };
      const stateWithIngredient: BurgerConstructorState = {
        bun: null,
        ingredients: [ingredient]
      };

      const action = moveIngredientUp(-1);
      const state = reducer(stateWithIngredient, action);

      expect(state.ingredients).toHaveLength(1);
    });
  });

  describe('moveIngredientDown', () => {
    test('should move ingredient down in array', () => {
      const ingredient1 = { ...mockMain, id: 'id-1', name: 'First' };
      const ingredient2 = { ...mockSauce, id: 'id-2', name: 'Second' };
      const ingredient3 = { ...mockMain, id: 'id-3', name: 'Third' };

      const stateWithIngredients: BurgerConstructorState = {
        bun: null,
        ingredients: [ingredient1, ingredient2, ingredient3]
      };

      const action = moveIngredientDown(0);
      const state = reducer(stateWithIngredients, action);

      expect(state.ingredients[0].name).toBe('Second');
      expect(state.ingredients[1].name).toBe('First');
      expect(state.ingredients[2].name).toBe('Third');
    });

    test('should not move last ingredient down', () => {
      const ingredient1 = { ...mockMain, id: 'id-1', name: 'First' };
      const ingredient2 = { ...mockSauce, id: 'id-2', name: 'Second' };

      const stateWithIngredients: BurgerConstructorState = {
        bun: null,
        ingredients: [ingredient1, ingredient2]
      };

      const action = moveIngredientDown(1);
      const state = reducer(stateWithIngredients, action);

      expect(state.ingredients[0].name).toBe('First');
      expect(state.ingredients[1].name).toBe('Second');
    });

    test('should handle out of bounds index gracefully', () => {
      const ingredient = { ...mockMain, id: 'id-1' };
      const stateWithIngredient: BurgerConstructorState = {
        bun: null,
        ingredients: [ingredient]
      };

      const action = moveIngredientDown(10);
      const state = reducer(stateWithIngredient, action);

      expect(state.ingredients).toHaveLength(1);
    });
  });

  describe('clearConstructor', () => {
    test('should clear all ingredients and bun', () => {
      const stateWithData: BurgerConstructorState = {
        bun: { ...mockBun, id: 'bun-id' },
        ingredients: [
          { ...mockMain, id: 'id-1' },
          { ...mockSauce, id: 'id-2' }
        ]
      };

      const action = clearConstructor();
      const state = reducer(stateWithData, action);

      expect(state.bun).toBeNull();
      expect(state.ingredients).toHaveLength(0);
    });

    test('should work on already empty state', () => {
      const action = clearConstructor();
      const state = reducer(initialState, action);

      expect(state.bun).toBeNull();
      expect(state.ingredients).toHaveLength(0);
    });
  });

  describe('Immer immutability', () => {
    test('should not mutate original state', () => {
      const originalState: BurgerConstructorState = {
        bun: null,
        ingredients: []
      };

      const action = addIngredient(mockMain);
      const newState = reducer(originalState, action);

      expect(originalState.ingredients).toHaveLength(0);
      expect(newState.ingredients).toHaveLength(1);
      expect(newState).not.toBe(originalState);
    });
  });
});
