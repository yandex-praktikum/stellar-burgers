import builderSlice, {
  addBunBuilder,
  addItemBuilder,
  deleteItemBuilder,
  moveItems,
  clearBuilder,
  selectConstructorItems,
  selectBun,
  selectConstructorTotalCount
} from '../builder-slice';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

describe('builderSlice', () => {
  const mockBun: TIngredient = {
    _id: 'bun1',
    name: 'Bun1',
    type: 'bun',
    proteins: 5,
    fat: 5,
    carbohydrates: 5,
    calories: 100,
    price: 100,
    image: 'image.png',
    image_mobile: 'image-mobile.png',
    image_large: 'image-large.png'
  };

  const mockIngredient: TConstructorIngredient = {
    _id: 'ing1',
    name: 'Ingredient1',
    type: 'sauce',
    proteins: 5,
    fat: 5,
    carbohydrates: 5,
    calories: 50,
    price: 50,
    image: 'image1.png',
    image_mobile: 'image1-mobile.png',
    image_large: 'image1-large.png',
    id: uuidv4()
  };

  it('Исходное состояние', () => {
    expect(builderSlice(undefined, { type: '' })).toEqual({
      constructorItems: {
        bun: null,
        ingredients: []
      }
    });
  });

  describe('addBunBuilder', () => {
    it('Добавить булочку в конструктор', () => {
      const previousState = {
        constructorItems: {
          bun: null,
          ingredients: []
        }
      };

      expect(builderSlice(previousState, addBunBuilder(mockBun))).toEqual({
        constructorItems: {
          bun: mockBun,
          ingredients: []
        }
      });
    });

    it('Заменить существующую булочку при добавлении новой', () => {
      const previousState = {
        constructorItems: {
          bun: mockBun,
          ingredients: []
        }
      };

      const newBun: TIngredient = {
        ...mockBun,
        _id: 'bun2',
        name: 'New Bun'
      };

      expect(builderSlice(previousState, addBunBuilder(newBun))).toEqual({
        constructorItems: {
          bun: newBun,
          ingredients: []
        }
      });
    });

    it('Установить значение bun равным null, когда полезная нагрузка равна null', () => {
      const previousState = {
        constructorItems: {
          bun: mockBun,
          ingredients: []
        }
      };

      expect(builderSlice(previousState, addBunBuilder(null))).toEqual({
        constructorItems: {
          bun: null,
          ingredients: []
        }
      });
    });
  });

  describe('addItemBuilder', () => {
    it('Добавить ингредиент в конструктор', () => {
      const previousState = {
        constructorItems: {
          bun: null,
          ingredients: []
        }
      };

      const action = addItemBuilder({
        ...mockIngredient,
        id: undefined as unknown as string
      });

      const result = builderSlice(previousState, action);

      expect(result.constructorItems.ingredients).toHaveLength(1);
      expect(result.constructorItems.ingredients[0]._id).toBe('ing1');
      expect(result.constructorItems.ingredients[0].id).toBeDefined();
    });

    it('Добавить булочку с помощью addItemBuilder', () => {
      const previousState = {
        constructorItems: {
          bun: null,
          ingredients: []
        }
      };

      const action = addItemBuilder({
        ...mockBun,
        id: undefined as unknown as string
      });

      const result = builderSlice(previousState, action);

      expect(result.constructorItems.bun).toMatchObject({
        _id: mockBun._id,
        name: mockBun.name,
        type: mockBun.type
      });

      // @ts-ignore
      expect(result.constructorItems.bun?.id).toBeDefined();
      expect(result.constructorItems.ingredients).toHaveLength(0);
    });
  });

  describe('deleteItemBuilder', () => {
    it('Удалить ингредиент из конструктора', () => {
      const ingredientToDelete = {
        ...mockIngredient,
        id: 'to-delete'
      };

      const ingredientToKeep = {
        ...mockIngredient,
        id: 'to-keep',
        _id: 'ing2'
      };

      const previousState = {
        constructorItems: {
          bun: mockBun,
          ingredients: [ingredientToDelete, ingredientToKeep]
        }
      };

      const action = deleteItemBuilder({
        id: 'to-delete',
        type: 'sauce'
      });

      const result = builderSlice(previousState, action);

      expect(result.constructorItems.ingredients).toHaveLength(1);
      expect(result.constructorItems.ingredients[0].id).toBe('to-keep');
    });

    it('Не удаление булочки', () => {
      const previousState = {
        constructorItems: {
          bun: mockBun,
          ingredients: []
        }
      };

      const action = deleteItemBuilder({
        id: 'bun1',
        type: 'bun'
      });

      const result = builderSlice(previousState, action);

      expect(result.constructorItems.bun).toEqual(mockBun);
    });
  });

  describe('moveItems', () => {
    const ingredient1 = {
      ...mockIngredient,
      id: '1',
      _id: 'ing1'
    };

    const ingredient2 = {
      ...mockIngredient,
      id: '2',
      _id: 'ing2'
    };

    const ingredient3 = {
      ...mockIngredient,
      id: '3',
      _id: 'ing3'
    };

    it('Переместить элемент вверх', () => {
      const previousState = {
        constructorItems: {
          bun: mockBun,
          ingredients: [ingredient1, ingredient2, ingredient3]
        }
      };

      const action = moveItems({
        index: 1,
        direction: 'up'
      });

      const result = builderSlice(previousState, action);

      expect(result.constructorItems.ingredients.map((i) => i.id)).toEqual([
        '2',
        '1',
        '3'
      ]);
    });

    it('Переместить элемент вниз', () => {
      const previousState = {
        constructorItems: {
          bun: mockBun,
          ingredients: [ingredient1, ingredient2, ingredient3]
        }
      };

      const action = moveItems({
        index: 1,
        direction: 'down'
      });

      const result = builderSlice(previousState, action);

      expect(result.constructorItems.ingredients.map((i) => i.id)).toEqual([
        '1',
        '3',
        '2'
      ]);
    });

    it('Не перемещать элемент вверх, если он находится первым', () => {
      const previousState = {
        constructorItems: {
          bun: mockBun,
          ingredients: [ingredient1, ingredient2, ingredient3]
        }
      };

      const action = moveItems({
        index: 0,
        direction: 'up'
      });

      const result = builderSlice(previousState, action);

      expect(result.constructorItems.ingredients.map((i) => i.id)).toEqual([
        '1',
        '2',
        '3'
      ]);
    });

    it('Не перемещать элемент вниз, если он является последним', () => {
      const previousState = {
        constructorItems: {
          bun: mockBun,
          ingredients: [ingredient1, ingredient2, ingredient3]
        }
      };

      const action = moveItems({
        index: 2,
        direction: 'down'
      });

      const result = builderSlice(previousState, action);

      expect(result.constructorItems.ingredients.map((i) => i.id)).toEqual([
        '1',
        '2',
        '3'
      ]);
    });
  });

  describe('clearBuilder', () => {
    it('Очистить все элементы от конструктора', () => {
      const previousState = {
        constructorItems: {
          bun: mockBun,
          ingredients: [mockIngredient, mockIngredient]
        }
      };

      const result = builderSlice(previousState, clearBuilder());

      expect(result).toEqual({
        constructorItems: {
          bun: null,
          ingredients: []
        }
      });
    });
  });

  describe('selectors', () => {
    const state = {
      builder: {
        constructorItems: {
          bun: mockBun,
          ingredients: [mockIngredient, mockIngredient]
        }
      }
    };

    it('Элементы selectConstructor должны возвращать все элементы конструктора', () =>
      // @ts-ignore
      expect(selectConstructorItems(state)).toEqual({
        bun: mockBun,
        ingredients: [mockIngredient, mockIngredient]
      }));

    it('selectBun должен вернуть булочку', () =>
      // @ts-ignore
      expect(selectBun(state)).toEqual(mockBun));

    it('selectConstructorTotalCount должен возвращать количество ингредиентов', () =>
      // @ts-ignore
      expect(selectConstructorTotalCount(state)).toBe(2));
  });
});
