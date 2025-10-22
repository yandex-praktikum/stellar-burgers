import userReducer, {
  initialState,
  registerUser,
  login,
  logout,
  fetchUser,
  updateUser
} from '../slices/userSlice'; // Убедитесь, что путь правильный
import { TUser } from '@utils-types';
import { TRegisterData, TLoginData } from '@api';

describe('тест user slice', () => {
  it('should return the initial state', () => {
    expect(userReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('тест на запрос регистрации пользователя', () => {
    const mockRegisterData: TRegisterData = {
      email: 'test@example.com',
      name: 'Test User',
      password: 'test123'
    };
    const action = registerUser.pending('requestId', mockRegisterData);
    const state = userReducer(initialState, action);
    expect(state.registerError).toBeUndefined();
  });

  it('тест на успешно зарегистрированного пользователя', () => {
    const mockUser: TUser = {
      email: 'test@example.com',
      name: 'Test User'
    };

    const mockRegisterData: TRegisterData = {
      email: 'test@example.com',
      name: 'Test User',
      password: 'test123'
    };

    const action = registerUser.fulfilled(
      mockUser,
      'requestId',
      mockRegisterData
    );
    const state = userReducer(initialState, action);
    expect(state.registerError).toBeUndefined();
    expect(state.isAuthenticated).toBe(true);
    expect(state.data).toEqual(mockUser);
  });

  it('тест ошибки зарегистрированного пользователя', () => {
    const mockError = {
      name: 'Test UserError',
      message: 'Registration error'
    } as Error;

    const mockRegisterData: TRegisterData = {
      email: 'test@example.com',
      name: 'Test User',
      password: 'test123'
    };
    const action = registerUser.rejected(
      mockError,
      'requestId',
      mockRegisterData
    );
    const state = userReducer(initialState, action);
    expect(state.registerError).toEqual(mockError);
  });

  it('тест на запрос залогининованного пользователя', () => {
    const mockLoginData: TLoginData = {
      email: 'test@example.com',
      password: 'testPassword'
    };
    const action = login.pending('requestId', mockLoginData);
    const state = userReducer(initialState, action);
    expect(state.loginError).toBeUndefined();
  });

  it('тест на успешно залогининованного пользователя', () => {
    const mockUser: TUser = {
      email: 'test@example.com',
      name: 'Test User'
    };

    const mockUserData: TLoginData = {
      email: 'test@example.com',
      password: 'testPassword'
    };

    const action = login.fulfilled(mockUser, 'requestId', mockUserData);
    const state = userReducer(initialState, action);
    expect(state.loginError).toBeUndefined();
    expect(state.isAuthenticated).toBe(true);
    expect(state.data).toEqual(mockUser);
  });

  it('тест на успешный logout', () => {
    const stateWithUser = {
      ...initialState,
      isAuthenticated: true,
      data: { _id: '123', email: 'test@example.com', name: 'Test User' }
    };
    const action = logout.fulfilled(void 0, 'requestId');
    const state = userReducer(stateWithUser, action);
    expect(state.isAuthenticated).toBe(false);
    expect(state.data).toBeNull();
  });

  it('тест на успешный запрос пользователя', () => {
    const mockUser: TUser = {
      email: 'test@example.com',
      name: 'Test User'
    };

    const action = fetchUser.fulfilled(mockUser, 'requestId', undefined);
    const state = userReducer(initialState, action);
    expect(state.isAuthenticated).toBe(true);
    expect(state.isAuthChecked).toBe(true);
    expect(state.data).toEqual(mockUser);
  });

  it('тест на успешное обновление пользователя', () => {
    const updatedUser: TUser = {
      email: 'updated@example.com',
      name: 'Updated User'
    };

    const action = updateUser.fulfilled(updatedUser, 'requestId', updatedUser);
    const stateWithUser = {
      ...initialState,
      isAuthenticated: true,
      data: { _id: '123', email: 'test@example.com', name: 'Test User' }
    };
    const state = userReducer(stateWithUser, action);
    expect(state.data).toEqual(updatedUser);
  });
});
