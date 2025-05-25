import { feedSlice, FeedsThunk, initialStateFeeds } from '@slices';
import { testOrder1, testOrder2 } from './fixtures';

describe('Orders slice', () => {
  describe('Async reducer', () => {
    it('should handle fulfilled state', () => {
      const mockFeeds = {
        orders: [testOrder1, testOrder2],
        total: 10,
        totalToday: 2
      };
      const action = { type: FeedsThunk.fulfilled.type, payload: mockFeeds };
      const nextState = feedSlice.reducer(initialStateFeeds, action);

      expect(nextState.feeds).toEqual(mockFeeds);
    });

    it('should handle rejected state and not change feeds', () => {
      const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const action = {
        type: FeedsThunk.rejected.type,
        error: { message: 'Error occurred' }
      };
      const nextState = feedSlice.reducer(initialStateFeeds, action);

      expect(nextState.feeds).toEqual(initialStateFeeds.feeds);
      expect(spy).toHaveBeenCalledWith(
        'FeedsThunk rejected:',
        'Error occurred'
      );

      spy.mockRestore();
    });
  });
});
