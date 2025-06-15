import consctructorSlice, {
  addIngredient,
  clearConstructorData,
  constructorState,
  deleteIngredient,
  moveIngredientDown,
  moveIngredientUp
} from '../src/services/slices/constructorSlice';
import { TConstructorIngredient } from './../src/utils/types';

describe('Тестирование consctructorSlice', () => {
  const testBun: TConstructorIngredient = {
    name: 'Булка',
    type: 'bun',
    proteins: 1,
    fat: 2,
    carbohydrates: 3,
    calories: 4,
    price: 100,
    image: 'imageUrl',
    image_large: 'imageUrl',
    image_mobile: 'imageUrl',
    id: 'id1',
    _id: '_id1'
  };
  const testIngredient: TConstructorIngredient = {
    name: 'Ингредиент',
    type: 'sauce',
    proteins: 1,
    fat: 2,
    carbohydrates: 3,
    calories: 4,
    price: 100,
    image: 'imageUrl',
    image_large: 'imageUrl',
    image_mobile: 'imageUrl',
    id: 'id1',
    _id: '_id1'
  };
  const testIngredient2: TConstructorIngredient = {
    name: 'Ингредиент 2',
    type: 'sauce',
    proteins: 1,
    fat: 2,
    carbohydrates: 3,
    calories: 4,
    price: 100,
    image: 'imageUrl',
    image_large: 'imageUrl',
    image_mobile: 'imageUrl',
    id: 'id2',
    _id: '_id2'
  };
  const testIngredient3: TConstructorIngredient = {
    name: 'Ингредиент 3',
    type: 'sauce',
    proteins: 1,
    fat: 2,
    carbohydrates: 3,
    calories: 4,
    price: 100,
    image: 'imageUrl',
    image_large: 'imageUrl',
    image_mobile: 'imageUrl',
    id: 'id3',
    _id: '_id3'
  };
  const initialState: constructorState = {
    bun: null,
    ingredients: []
  };
  const reducer = consctructorSlice.reducer;
  test('Ингредиент добавляется', () => {
    const newState = reducer(initialState, addIngredient(testIngredient));
    const { ingredients } = newState;
    expect(ingredients).toContainEqual(testIngredient);
  });
  test('Булка добавляется', () => {
    const newState = reducer(initialState, addIngredient(testBun));
    const { bun } = newState;
    expect(bun).toEqual(testBun);
  });
  test('Ингредиент удаляется', () => {
    const stateWithIngredient = {
      ...initialState,
      ingredients: [testIngredient]
    };
    const newState = reducer(
      stateWithIngredient,
      deleteIngredient(testIngredient)
    );
    const { ingredients } = newState;
    expect(ingredients).not.toContainEqual(testIngredient);
  });

  test('Ингредиент перемещается вниз', () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: [testIngredient, testIngredient2, testIngredient3]
    };
    const newState = reducer(
      stateWithIngredients,
      moveIngredientDown(testIngredient2)
    );
    expect(newState.ingredients).toEqual([
      testIngredient,
      testIngredient3,
      testIngredient2
    ]);
  });
  test('Ингредиент перемещается вверх', () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: [testIngredient, testIngredient2, testIngredient3]
    };
    const newState = reducer(
      stateWithIngredients,
      moveIngredientUp(testIngredient2)
    );
    expect(newState.ingredients).toEqual([
      testIngredient2,
      testIngredient,
      testIngredient3
    ]);
  });
  test('Список ингредиентов очищается', () => {
    const stateWithIngredientsAndBun = {
      bun: testBun,
      ingredients: [testIngredient, testIngredient2, testIngredient3]
    };
    const newState = reducer(
      stateWithIngredientsAndBun,
      clearConstructorData()
    );
    const { bun, ingredients } = newState;
    expect(bun).toBeNull();
    expect(ingredients).toHaveLength(0);
  });
});
