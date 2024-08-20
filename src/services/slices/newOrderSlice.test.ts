import { error } from 'console';
import {
  newOrderReducer,
  resetOrder,
  placeNewOrder,
  initialState,
  getOrderModalData
} from './newOrderSlice';

describe('тест асинхронных экшенов', () => {
  describe('запрос всех заказо', () => {
    it('тест placeNewOrder.fulfilled', () => {
      const action = {
        type: placeNewOrder.fulfilled.type,
        payload: {
          order: {
            _id: 'string',
            status: 'string',
            name: 'string',
            createdAt: 'string',
            updatedAt: 'string',
            number: 'number',
            ingredients: ['test']
          }
        }
      };

      const newState = newOrderReducer(initialState, action);
      expect(newState).toEqual({
        orderRequest: false,
        orderModalData: {
          _id: 'string',
          status: 'string',
          name: 'string',
          createdAt: 'string',
          updatedAt: 'string',
          number: 'number',
          ingredients: ['test']
        },
        error: undefined
      });
    });

    it('тест placeNewOrder.rejected', () => {
      const action = {
        type: placeNewOrder.rejected.type,
        error: { message: 'test' }
      };
      const newState = newOrderReducer(initialState, action);
      expect(newState).toEqual({
        orderRequest: false,
        orderModalData: null,
        error: 'test'
      });
    });

    it('тест placeNewOrder.pending', () => {
      const action = {
        type: placeNewOrder.pending.type
      };

      const newState = newOrderReducer(initialState, action);
      expect(newState.orderRequest).toBe(true);
    });
  });
});
