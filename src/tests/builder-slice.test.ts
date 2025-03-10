import builderReducer, {
  addBunBuilder,
  addItemBuilder,
  deleteItemBuilder,
  moveItems,
  clearBuilder
} from '../slices/builderSlice';
import { TIngredient, TConstructorIngredient } from '@utils-types';

describe('builderSlice reducer', () => {
  const initialState = {
    constructorItems: {
      bun: null,
      ingredients: []
    }
  };

  it('тест на возвращение начального состояния', () => {
    expect(builderReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('тест на добавление булок в конструкторе', () => {
    const bun: TIngredient = {
      _id: 'bun_1',
      name: 'Флюоресцентная булка R2-D3',
      type: 'bun',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/bun-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
    };

    const state = builderReducer(initialState, addBunBuilder(bun));
    expect(state.constructorItems.bun).toEqual(bun);
  });

  it('тест на добавление ингредиентов в конструкторе', () => {
    const ingredient: TConstructorIngredient = {
      _id: 'ingredient_1',
      name: 'Мясо бессмертных моллюсков',
      type: 'main',
      proteins: 433,
      fat: 244,
      carbohydrates: 33,
      calories: 420,
      price: 1337,
      image: 'https://code.s3.yandex.net/react/code/meat-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
      id: expect.any(String)
    };

    const state = builderReducer(initialState, addItemBuilder(ingredient));
    expect(state.constructorItems.ingredients).toHaveLength(1);
    expect(state.constructorItems.ingredients[0]).toEqual({
      ...ingredient,
      id: expect.any(String)
    });
  });

  it('тест на удаление ингредиента', () => {
    const ingredient: TConstructorIngredient = {
      _id: 'ingredient_1',
      name: 'Мясо бессмертных моллюсков',
      type: 'main',
      proteins: 433,
      fat: 244,
      carbohydrates: 33,
      calories: 420,
      price: 1337,
      image: 'https://code.s3.yandex.net/react/code/meat-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
      id: 'cf6e39ea-87ed-477a-bcb0-c8dcf6325e51'
    };

    let state = builderReducer(initialState, addItemBuilder(ingredient));
    expect(state.constructorItems.ingredients).toHaveLength(1);

    state = builderReducer(
      state,
      deleteItemBuilder({ id: ingredient._id, type: ingredient.type })
    );
    expect(state.constructorItems.ingredients).toEqual(
      state.constructorItems.ingredients.slice(0, 2)
    );
  });

  it('тест на сортировку ингредиентов', () => {
    const ingredient1: TConstructorIngredient = {
      _id: 'ingredient_1',
      name: 'Мясо бессмертных моллюсков',
      type: 'main',
      proteins: 433,
      fat: 244,
      carbohydrates: 33,
      calories: 420,
      price: 1337,
      image: 'https://code.s3.yandex.net/react/code/meat-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
      id: expect.any(String)
    };
    const ingredient2: TConstructorIngredient = {
      _id: 'ingredient_2',
      name: 'Мини-салат Экзо-Плантаго',
      type: 'main',
      proteins: 1,
      fat: 2,
      carbohydrates: 3,
      calories: 6,
      price: 4400,
      image: 'https://code.s3.yandex.net/react/code/salad.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/salad-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/salad-large.png',
      id: expect.any(String)
    };

    let state = builderReducer(initialState, addItemBuilder(ingredient1));
    state = builderReducer(state, addItemBuilder(ingredient2));

    expect(state.constructorItems.ingredients).toHaveLength(2);
    expect(state.constructorItems.ingredients[0]).toEqual(ingredient1);
    expect(state.constructorItems.ingredients[1]).toEqual(ingredient2);

    state = builderReducer(state, moveItems({ index: 0, direction: 'down' }));

    expect(state.constructorItems.ingredients[0]).toEqual(ingredient2);
    expect(state.constructorItems.ingredients[1]).toEqual(ingredient1);
  });

  it('тест на очищение конструктора', () => {
    const bun: TIngredient = {
      _id: 'bun_1',
      name: 'Флюоресцентная булка R2-D3',
      type: 'bun',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/bun-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
    };
    const ingredient: TConstructorIngredient = {
      _id: 'ingredient_1',
      name: 'Мясо бессмертных моллюсков',
      type: 'main',
      proteins: 433,
      fat: 244,
      carbohydrates: 33,
      calories: 420,
      price: 1337,
      image: 'https://code.s3.yandex.net/react/code/meat-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
      id: 'ingredient-1'
    };

    let state = builderReducer(initialState, addBunBuilder(bun));
    state = builderReducer(state, addItemBuilder(ingredient));

    expect(state.constructorItems.bun).toEqual(bun);
    expect(state.constructorItems.ingredients).toHaveLength(1);

    state = builderReducer(state, clearBuilder());

    expect(state.constructorItems.bun).toBeNull();
    expect(state.constructorItems.ingredients).toHaveLength(0);
  });
});
