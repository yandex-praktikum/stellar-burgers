import { TNewOrderResponse } from '../src/utils/burger-api';
import orderSlice, {
  clearOrderData,
  createOrder,
  fetchOrderBurger
} from './../src/services/slices/orderSlice';

describe('Тестирование orderSlice', () => {
  const reducer = orderSlice.reducer;
  const initialState = {
    orderRequest: false,
    orderIngredients: [],
    orderData: null,
    error: null
  };
  const testOrder = {
    bun: {
      _id: '_id0',
      id: 'id0',
      name: 'Булка',
      type: 'bun',
      proteins: 1,
      fat: 2,
      carbohydrates: 3,
      calories: 4,
      price: 100,
      image: 'imageUrl',
      image_large: 'imageUrl',
      image_mobile: 'imageUrl'
    },
    ingredients: [
      {
        _id: '_id1',
        id: 'id1',
        name: 'Ингредиент',
        type: 'sauce',
        proteins: 1,
        fat: 2,
        carbohydrates: 3,
        calories: 4,
        price: 100,
        image: 'imageUrl',
        image_large: 'imageUrl',
        image_mobile: 'imageUrl'
      },
      {
        _id: '_id2',
        id: 'id2',
        name: 'Ингредиент2',
        type: 'sauce',
        proteins: 1,
        fat: 2,
        carbohydrates: 3,
        calories: 4,
        price: 100,
        image: 'imageUrl',
        image_large: 'imageUrl',
        image_mobile: 'imageUrl'
      },
      {
        _id: '_id3',
        id: 'id3',
        name: 'Ингредиент3',
        type: 'sauce',
        proteins: 1,
        fat: 2,
        carbohydrates: 3,
        calories: 4,
        price: 100,
        image: 'imageUrl',
        image_large: 'imageUrl',
        image_mobile: 'imageUrl'
      }
    ]
  };
  const newTestOrderIngredients = ['_id0', '_id1', '_id2', '_id3', '_id0'];
  describe('Тестирование добавления и удаления ингредиентов', () => {
    test('Ингредиенты добавляются в заказ', () => {
      const newState = reducer(initialState, createOrder(testOrder));
      const { orderIngredients } = newState;
      expect(orderIngredients).toEqual(newTestOrderIngredients);
    });

    test('Ингредиенты удаляются из заказа', () => {
      const stateWithIngredients = {
        ...initialState,
        orderIngredients: [...newTestOrderIngredients]
      };
      const newState = reducer(stateWithIngredients, clearOrderData());
      const { orderIngredients } = newState;
      expect(orderIngredients).toHaveLength(0);
    });
  });
  describe('Тестирование процесса создания заказа', () => {
    test('Заказ создаётся (pending)', () => {
      const expectedState = {
        ...initialState,
        orderRequest: true
      };
      const newState = reducer(
        initialState,
        fetchOrderBurger.pending('', [''])
      );
      expect(newState).toEqual(expectedState);
    });

    test('Заказ создаётся успешно (fulfilled)', () => {
      const orderData: TNewOrderResponse = {
        success: true,
        order: {
          _id: '1234',
          status: 'success',
          name: 'newOrder',
          createdAt: 'someDate',
          updatedAt: 'someDate',
          number: 1234,
          ingredients: [...newTestOrderIngredients]
        },
        name: 'newOrderName'
      };
      const expectedState = {
        ...initialState,
        orderData: orderData.order
      };
      const newState = reducer(
        initialState,
        fetchOrderBurger.fulfilled(orderData, '', [''])
      );
      expect(newState).toEqual(expectedState);
    });
    test('Заказ не создаётся (rejected)', () => {
      const error = new Error('Test error');
      const expectedState = {
        ...initialState,
        error: error.message
      };
      const newState = reducer(
        initialState,
        fetchOrderBurger.rejected(error, '', [''])
      );
      expect(newState).toEqual(expectedState);
    });
  });
});
