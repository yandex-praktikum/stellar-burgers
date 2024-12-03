import {
    constructorReducer,
    addIngredient,
    removeIngredient,
    moveIngredient,
    clearConstructor,
    initialState,
  } from './constructorSlice';
  
  describe('constructorSlice reducer tests', () => {
    const bunIngredient = {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      id: 'testIdBun',
    };
  
    const mainIngredient = {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      id: 'testIdMain',
    };
  
    test('should handle addIngredient for a bun', () => {
      const newState = constructorReducer(
        initialState,
        addIngredient(bunIngredient)
      );
      if (newState.bun) {
        const expectedBun = { ...bunIngredient, id: newState.bun.id }; // Dynamic id
        expect(newState.bun).toMatchObject(expectedBun);
      } else {
        fail('Bun was not added');
      }
      expect(newState.ingredients.length).toBe(0);
    });
    
    
  
    test('should handle addIngredient for a main ingredient', () => {
      const newState = constructorReducer(
        initialState,
        addIngredient(mainIngredient)
      );
      const expectedMain = { ...mainIngredient, id: newState.ingredients[0].id };
      expect(newState.ingredients[0]).toMatchObject(expectedMain);
    });
    
  
    test('should handle removeIngredient', () => {
      const initialStateWithIngredients = {
        ...initialState,
        ingredients: [mainIngredient],
      };
  
      const newState = constructorReducer(
        initialStateWithIngredients,
        removeIngredient(mainIngredient.id)
      );
      expect(newState.ingredients).toHaveLength(0);
    });
  
    test('should handle moveIngredient', () => {
      const initialStateWithIngredients = {
        ...initialState,
        ingredients: [mainIngredient, bunIngredient],
      };
  
      const newState = constructorReducer(
        initialStateWithIngredients,
        moveIngredient({ fromIndex: 0, toIndex: 1 })
      );
  
      expect(newState.ingredients[0]).toEqual(bunIngredient);
      expect(newState.ingredients[1]).toEqual(mainIngredient);
    });
  
    test('should handle clearConstructor', () => {
      const filledState = {
        bun: bunIngredient,
        ingredients: [mainIngredient],
      };
  
      const newState = constructorReducer(filledState, clearConstructor());
      expect(newState).toEqual(initialState);
    });
  });
  