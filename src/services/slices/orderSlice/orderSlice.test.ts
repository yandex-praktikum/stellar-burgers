import reducer, { postOrder, clearOrderModal } from './orderSlice';
import { TOrder } from '@utils-types';

describe('orderSlice extraReducers', () => {
  const initialState = {
    orderRequest: false,
    orderModalData: null,
    error: null
  };

  const mockOrder: TOrder = {
    _id: 'ord123',
    status: 'done',
    name: 'Stellar Burger',
    createdAt: '2023-01-01',
    updatedAt: '2023-01-01',
    number: 555,
    ingredients: ['1', '2']
  };

  it('должен очищать данные модального окна (clearOrderModal)', () => {
    const stateWithOrder = { ...initialState, orderModalData: mockOrder };
    const state = reducer(stateWithOrder, clearOrderModal());
    expect(state.orderModalData).toBeNull();
  });

  describe('тестирование postOrder (создание заказа)', () => {
    it('должен устанавливать orderRequest: true при postOrder.pending', () => {
      const state = reducer(initialState, { type: postOrder.pending.type });
      expect(state.orderRequest).toBe(true);
      expect(state.error).toBeNull();
    });

    it('должен записывать данные заказа при postOrder.fulfilled', () => {
      const state = reducer(
        { ...initialState, orderRequest: true },
        { type: postOrder.fulfilled.type, payload: mockOrder }
      );
      expect(state.orderRequest).toBe(false);
      expect(state.orderModalData).toEqual(mockOrder);
    });

    it('должен записывать ошибку при postOrder.rejected', () => {
      const errorText = 'Не удалось создать заказ';
      const state = reducer(
        { ...initialState, orderRequest: true },
        { type: postOrder.rejected.type, error: { message: errorText } }
      );
      expect(state.orderRequest).toBe(false);
      expect(state.error).toBe(errorText);
      expect(state.orderModalData).toBeNull();
    });
  });
});