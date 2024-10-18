import { profileSlice, getUser, updateUser, profileLogin, userLogout } from './profileUserSlice';
import { expect, test } from '@jest/globals';

describe('profileUserSlice', () => {
  const initialState = {
    user: null,
    isDataLoading: false,
    error: null,
    isLoading: false,
  };

  test('обрабатывает экшен getUser.pending', () => {
    const action = { type: getUser.pending.type };
    const state = profileSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('обрабатывает экшен getUser.fulfilled', () => {
    const action = { type: getUser.fulfilled.type, payload: { user: { name: 'Иван', email: 'ivan@mail.ru' } } };
    const state = profileSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual({ name: 'Иван', email: 'ivan@mail.ru' });
  });

  test('обрабатывает экшен getUser.rejected', () => {
    const action = { type: getUser.rejected.type, error: { message: 'Ошибка выполнения' } };
    const state = profileSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка выполнения');
  });
});
