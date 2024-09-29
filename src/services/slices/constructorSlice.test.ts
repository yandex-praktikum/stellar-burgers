import { TConstructorIngredient, TIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';
import {
  addIngredient,
  constructorSelector,
  initialState,
  moveIngredientDown,
  moveIngredientUp,
  burgerConstructorReducer as reducer,
  removeIngredient,
  TConstructorState
} from './constructorSlice';

jest.mock('uuid', () => ({
  v4: jest.fn()
}));

const mockUuid = 'uuid';

const bunData = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
};

const ingredientData = {
  _id: '643d69a5c3f7b9001cfa0941',
  id: mockUuid,
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
};

const ingredientsData: TConstructorIngredient[] = [
  {
    _id: '643d69a5c3f7b9001cfa0941',
    id: '67a5d503-1a32-4af0-9d20-49d8d55d0bb4',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa093e',
    id: '29996fa8-23e5-46f4-bb51-941ddf6e913f',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
  }
];

describe('constructor slice', () => {
  beforeEach(() => {
    (uuidv4 as jest.Mock).mockReturnValue(mockUuid);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('initialState', () => {
    expect(reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      initialState
    );
  });

  test('constructorSelector', () => {
    const state = { burgerConstructor: initialState };
    const result = constructorSelector.constructorSelector(state);
    expect(result).toEqual(initialState);
  });

  test('add bun', () => {
    const ingredient = {
      ...bunData,
      id: mockUuid
    };
    const action = addIngredient(ingredient);
    const state = reducer(initialState, action);

    // expect(state.bun).toBeTruthy();
    expect(state.bun).toEqual(ingredient);
    expect(state.bun).toEqual({ ...bunData, id: mockUuid });
  });

  test('add ingredient', () => {
    const ingredient = {
      ...ingredientData,
      id: mockUuid
    };

    const action = addIngredient(ingredient);
    const state = reducer(initialState, action);

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual({ ...ingredientData, id: mockUuid });
  });

  test('remove bun', () => {
    const stateWithBun: TConstructorState = {
      bun: {
        ...bunData,
        id: mockUuid
      },
      ingredients: []
    };

    const action = removeIngredient(stateWithBun.ingredients[0]);
    const state = reducer(stateWithBun, action);

    expect(state.ingredients).toEqual([]);
  });

  test('remove ingredient', () => {
    const stateWithIngredient: TConstructorState = {
      bun: null,
      ingredients: [
        {
          ...ingredientData,
          id: mockUuid
        }
      ]
    };

    const action = removeIngredient(stateWithIngredient.ingredients[1]);
    const state = reducer(initialState, action);

    expect(state.ingredients).toHaveLength(0);
    expect(state.ingredients).toEqual([]);
  });

  test('move ingredient up', () => {
    const stateWithIngredients: TConstructorState = {
      bun: null,
      ingredients: [...ingredientsData]
    };

    const action = moveIngredientUp(1);
    const state = reducer(stateWithIngredients, action);

    expect(state.ingredients[1]).toEqual(ingredientsData[0]);
    expect(state.ingredients[0]).toEqual(ingredientsData[1]);
  });

  test('move ingredient down', () => {
    const stateWithIngredients: TConstructorState = {
      bun: null,
      ingredients: [...ingredientsData]
    };

    const action = moveIngredientDown(0);
    const state = reducer(stateWithIngredients, action);

    expect(state.ingredients[0]).toEqual(ingredientsData[1]);
    expect(state.ingredients[1]).toEqual(ingredientsData[0]);
  });
});
