import reducer, {
  login,
  register,
  logout,
  checkUserAuth,
  clearUserError
} from './userSlice';

describe('userSlice extraReducers', () => {
  const initialState = {
    user: null,
    isAuthChecked: false,
    error: null
  };

  const mockUser = { email: 'test@test.com', name: 'Ivan' };

  it('должен очищать ошибку через clearUserError', () => {
    const stateWithError = { ...initialState, error: 'some error' };
    const state = reducer(stateWithError, clearUserError());
    expect(state.error).toBeNull();
  });

  describe('тестирование login', () => {
    it('должен записывать пользователя при login.fulfilled', () => {
      const action = {
        type: login.fulfilled.type,
        payload: { user: mockUser }
      };
      const state = reducer(initialState, action);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthChecked).toBe(true);
      expect(state.error).toBeNull();
    });

    it('должен записывать ошибку при login.rejected', () => {
      const action = {
        type: login.rejected.type,
        error: { message: 'Login failed' }
      };
      const state = reducer(initialState, action);
      expect(state.user).toBeNull();
      expect(state.isAuthChecked).toBe(true);
      expect(state.error).toBe('Login failed');
    });
  });

  describe('тестирование checkUserAuth', () => {
    it('должен устанавливать isAuthChecked: true при успехе', () => {
      const action = {
        type: checkUserAuth.fulfilled.type,
        payload: { user: mockUser }
      };
      const state = reducer(initialState, action);
      expect(state.isAuthChecked).toBe(true);
      expect(state.user).toEqual(mockUser);
    });

    it('должен устанавливать isAuthChecked: true при ошибке (запрос завершен)', () => {
      const action = { type: checkUserAuth.rejected.type };
      const state = reducer(initialState, action);
      expect(state.isAuthChecked).toBe(true);
    });
  });

  describe('тестирование logout', () => {
    it('должен удалять пользователя при logout.fulfilled', () => {
      const loggedInState = { ...initialState, user: mockUser };
      const action = { type: logout.fulfilled.type };
      const state = reducer(loggedInState, action);
      expect(state.user).toBeNull();
    });
  });
});
