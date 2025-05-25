import { ordersSlice, userOrdersThunk, initialStateOrder } from '@slices';
import { testOrder1, testOrder2 } from './fixtures';

describe('User orders slice', () => {
  describe('Async reducer', () => {
    it('should handle pending state', () => {
      const action = { type: userOrdersThunk.pending.type };
      const nextState = ordersSlice.reducer(initialStateOrder, action);

      expect(nextState.isLoad).toBe(true);
      expect(nextState.userOrders).toHaveLength(0);
    });

    it('should handle fulfilled state', () => {
      const mockOrders = [testOrder1, testOrder2];
      const action = {
        type: userOrdersThunk.fulfilled.type,
        payload: mockOrders
      };
      const nextState = ordersSlice.reducer(initialStateOrder, action);

      expect(nextState.isLoad).toBe(false);
      expect(nextState.userOrders).toEqual(mockOrders);
    });

    it('should handle rejected state', () => {
      const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const action = {
        type: userOrdersThunk.rejected.type,
        error: { message: 'Error occurred' }
      };
      const nextState = ordersSlice.reducer(initialStateOrder, action);

      expect(nextState.isLoad).toBe(false);
      expect(nextState.userOrders).toHaveLength(0);
      expect(spy).toHaveBeenCalledWith(
        'userOrdersThunk rejected:',
        'Error occurred'
      );

      spy.mockRestore();
    });
  });
});
