import { feedSlice, feedThunk } from '../slices/feedSlice'; // Путь к вашему файлу feedSlice
import { TFeedState } from '@utils-types';

describe('feedSlice', () => {
  const initialState: TFeedState = {
    feed: null,
    loading: false,
    error: null,
  };

  it('should handle initial state', () => {
    expect(feedSlice.reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle pending state', () => {
    const action = { type: feedThunk.pending.type };
    const state = feedSlice.reducer(initialState, action);
    
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle fulfilled state', () => {
    const mockFeedData = { orders: [] }; // Задаем данные, которые, как предполагалось, были возвращены от API.
    const action = { type: feedThunk.fulfilled.type, payload: mockFeedData };
    
    const state = feedSlice.reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.feed).toEqual(mockFeedData);
    expect(state.error).toBeNull();
  });

  it('should handle rejected state', () => {
    const mockError = { message: 'Something went wrong' };
    const action = { type: feedThunk.rejected.type, error: { message: mockError.message } };
    
    const state = feedSlice.reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toEqual({ message: mockError.message });
  });
});
