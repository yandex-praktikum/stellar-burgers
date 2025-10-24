import {
    initialState,
    userReducer,
    registerUser,
    loginUser,
    logoutUser,
    getUser,
    updateUser
  } from './userSlice';
  
  describe('Проверка работы редьюсера [userSlice]', () => {
    const mockUser = {
      email: 'test@example.com',
      name: 'Test User'
    };
  
    test('Обработка экшена [registerUser.fulfilled]', () => {
      const action = {
        type: registerUser.fulfilled.type,
        payload: { user: mockUser }
      };
      const expectedState = {
        ...initialState,
        isLoading: false,
        isAuthenticated: true,
        user: mockUser,
        error: null
      };
      const newState = userReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });
  
    test('Обработка экшена [registerUser.pending]', () => {
      const action = { type: registerUser.pending.type };
      const expectedState = { ...initialState, isLoading: true, error: null };
      const newState = userReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });
  
    test('Обработка экшена [registerUser.rejected]', () => {
      const action = {
        type: registerUser.rejected.type,
        error: { message: 'Registration error' }
      };
      const expectedState = {
        ...initialState,
        isLoading: false,
        error: 'Registration error'
      };
      const newState = userReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });
  
    test('Обработка экшена [loginUser.fulfilled]', () => {
      const action = {
        type: loginUser.fulfilled.type,
        payload: { user: mockUser }
      };
      const expectedState = {
        ...initialState,
        isLoading: false,
        isAuthenticated: true,
        user: mockUser,
        error: null
      };
      const newState = userReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });
  
    test('Обработка экшена [loginUser.pending]', () => {
      const action = { type: loginUser.pending.type };
      const expectedState = { ...initialState, isLoading: true, error: null };
      const newState = userReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });
  
    test('Обработка экшена [loginUser.rejected]', () => {
      const action = {
        type: loginUser.rejected.type,
        error: { message: 'Login error' }
      };
      const expectedState = {
        ...initialState,
        isLoading: false,
        isAuthenticated: false,
        error: 'Login error'
      };
      const newState = userReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });
  
    test('Обработка экшена [logoutUser.fulfilled]', () => {
      const action = { type: logoutUser.fulfilled.type };
      const expectedState = {
        ...initialState,
        user: null,  // изменяем ожидаемое значение user на null
        isAuthenticated: false
      };
      const newState = userReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });
    
  
    test('Обработка экшена [getUser.fulfilled]', () => {
      const action = {
        type: getUser.fulfilled.type,
        payload: { user: mockUser }
      };
      const expectedState = {
        ...initialState,
        isLoading: false,
        isAuthenticated: true,
        user: mockUser,
        error: null
      };
      const newState = userReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });
  
    test('Обработка экшена [getUser.rejected]', () => {
      const action = {
        type: getUser.rejected.type,
        error: { message: 'Failed to get user' }
      };
      const expectedState = {
        ...initialState,
        isLoading: false,
        isAuthenticated: false,
        error: 'Failed to get user'
      };
      const newState = userReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });
  
    test('Обработка экшена [updateUser.fulfilled]', () => {
      const action = {
        type: updateUser.fulfilled.type,
        payload: { email: 'test@example.com', name: 'Updated User' }
      };
      const expectedState = {
        ...initialState,
        isLoading: false,
        isAuthenticated: true,
        user: { email: 'test@example.com', name: 'Updated User' },
        error: null
      };
      const newState = userReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });
    
  
    test('Обработка экшена [updateUser.rejected]', () => {
      const action = {
        type: updateUser.rejected.type,
        error: { message: 'Failed to update user' }
      };
      const expectedState = {
        ...initialState,
        isLoading: false,
        error: 'Failed to update user'
      };
      const newState = userReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });
  });
  