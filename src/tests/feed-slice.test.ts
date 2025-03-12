import { feedSlice, feedThunk, initialState } from '../slices/feedSlice';

describe('feedSlice', () => {
  it('обработка начального состояния', () => {
    expect(feedSlice.reducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('тест на запрос на сервер', () => {
    const action = { type: feedThunk.pending.type };
    const state = feedSlice.reducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('тест на получение успешного запроса', () => {
    const mockFeedData = { orders: [] };
    const action = { type: feedThunk.fulfilled.type, payload: mockFeedData };

    const state = feedSlice.reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.feed).toEqual(mockFeedData);
    expect(state.error).toBeNull();
  });

  it('тест на ошибки', () => {
    const mockError = { message: 'Something went wrong' };
    const action = {
      type: feedThunk.rejected.type,
      error: { message: mockError.message }
    };

    const state = feedSlice.reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toEqual({ message: mockError.message });
  });
});
