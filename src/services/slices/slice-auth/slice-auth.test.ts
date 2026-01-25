import { expect, test, describe, beforeEach, jest } from '@jest/globals';
import {
  authReducer,
  clearAuthError,
  resetForgotPasswordState,
  resetResetPasswordState,
  registerUser,
  loginUser,
  logoutUser,
  fetchUser,
  updateUser,
  forgotPassword,
  resetPassword
} from './slice-auth';

import * as api from '@api';

jest.mock('@api');
const apiMock = api as jest.Mocked<typeof api>;

jest.mock('../../../utils/cookie', () => ({
  setCookie: jest.fn(),
  deleteCookie: jest.fn()
}));

const { setCookie, deleteCookie } = jest.requireMock(
  '../../../utils/cookie'
) as {
  setCookie: jest.Mock;
  deleteCookie: jest.Mock;
};

const getInitialState = () => authReducer(undefined, { type: '@@init' });

describe('Проверка слайся авторизации редьюсеры', () => {
  const user = { email: 'test@example.com', name: 'TEST USER' };
  const authPayload = {
    accessToken: 'access',
    refreshToken: 'refresh',
    user,
    success: true
  };
  const registerPayload = {
    email: 'test@mail.ru',
    name: 'Pasha',
    password: '123'
  };
  const loginPayload = { email: 'test@mail.ru', password: '123' };
  const updatePayload = { name: 'Pasha' };
  const forgotPayload = { email: 'test@mail.ru' };
  const resetPayload = { password: '123', token: 'reset' };

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('clearAuthError', () => {
    const state = authReducer(
      { ...getInitialState(), error: 'Boom' },
      clearAuthError()
    );
    expect(state.error).toBeNull();
  });

  test('resetForgotPasswordState', () => {
    const state = authReducer(
      { ...getInitialState(), forgotPasswordSuccess: true },
      resetForgotPasswordState()
    );
    expect(state.forgotPasswordSuccess).toBe(false);
  });

  test('resetResetPasswordState', () => {
    const state = authReducer(
      { ...getInitialState(), resetPasswordSuccess: true },
      resetResetPasswordState()
    );
    expect(state.resetPasswordSuccess).toBe(false);
  });

  test('registerUser pending', () => {
    const state = authReducer(
      getInitialState(),
      registerUser.pending('', registerPayload)
    );
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('registerUser fulfilled', () => {
    const state = authReducer(
      getInitialState(),
      registerUser.fulfilled(authPayload, '', registerPayload)
    );
    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(user);
    expect(state.isAuthChecked).toBe(true);
    expect(setCookie).toHaveBeenCalledWith('accessToken', 'access');
    expect(localStorage.getItem('refreshToken')).toBe('refresh');
  });

  test('registerUser rejected', () => {
    const state = authReducer(
      getInitialState(),
      registerUser.rejected(null, '', registerPayload, 'Register error')
    );
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Register error');
  });

  test('loginUser pending', () => {
    const state = authReducer(
      getInitialState(),
      loginUser.pending('', loginPayload)
    );
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('loginUser fulfilled', () => {
    const state = authReducer(
      getInitialState(),
      loginUser.fulfilled(authPayload, '', loginPayload)
    );
    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(user);
    expect(state.isAuthChecked).toBe(true);
    expect(setCookie).toHaveBeenCalledWith('accessToken', 'access');
    expect(localStorage.getItem('refreshToken')).toBe('refresh');
  });

  test('loginUser rejected', () => {
    const state = authReducer(
      getInitialState(),
      loginUser.rejected(null, '', loginPayload, 'Login error')
    );
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Login error');
  });

  test('logoutUser pending', () => {
    const state = authReducer(
      getInitialState(),
      logoutUser.pending('', undefined)
    );
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('logoutUser fulfilled', () => {
    const state = authReducer(
      { ...getInitialState(), user },
      logoutUser.fulfilled(undefined, '', undefined)
    );
    expect(state.isLoading).toBe(false);
    expect(state.user).toBeNull();
    expect(state.isAuthChecked).toBe(true);
    expect(deleteCookie).toHaveBeenCalledWith('accessToken');
    expect(localStorage.getItem('refreshToken')).toBeNull();
  });

  test('logoutUser rejected', () => {
    const state = authReducer(
      getInitialState(),
      logoutUser.rejected(null, '', undefined, 'Logout error')
    );
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Logout error');
  });

  test('fetchUser pending', () => {
    const state = authReducer(
      getInitialState(),
      fetchUser.pending('', undefined)
    );
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('fetchUser fulfilled', () => {
    const state = authReducer(
      getInitialState(),
      fetchUser.fulfilled({ user }, '', undefined)
    );
    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(user);
    expect(state.isAuthChecked).toBe(true);
  });

  test('fetchUser rejected', () => {
    const state = authReducer(
      getInitialState(),
      fetchUser.rejected(null, '', undefined, 'Fetch user error')
    );
    expect(state.isLoading).toBe(false);
    expect(state.user).toBeNull();
    expect(state.isAuthChecked).toBe(true);
    expect(state.error).toBeNull();
  });

  test('updateUser pending', () => {
    const state = authReducer(
      getInitialState(),
      updateUser.pending('', updatePayload)
    );
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('updateUser fulfilled', () => {
    const state = authReducer(
      { ...getInitialState(), isAuthChecked: true },
      updateUser.fulfilled({ user }, '', updatePayload)
    );
    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(user);
    expect(state.isAuthChecked).toBe(true);
  });

  test('updateUser rejected', () => {
    const state = authReducer(
      getInitialState(),
      updateUser.rejected(null, '', updatePayload, 'Update error')
    );
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Update error');
  });

  test('forgotPassword pending', () => {
    const state = authReducer(
      getInitialState(),
      forgotPassword.pending('', forgotPayload)
    );
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('forgotPassword fulfilled', () => {
    const state = authReducer(
      getInitialState(),
      forgotPassword.fulfilled({ success: true }, '', forgotPayload)
    );
    expect(state.isLoading).toBe(false);
    expect(state.forgotPasswordSuccess).toBe(true);
  });

  test('forgotPassword rejected', () => {
    const state = authReducer(
      getInitialState(),
      forgotPassword.rejected(null, '', forgotPayload, 'Forgot error')
    );
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Forgot error');
  });

  test('resetPassword pending', () => {
    const state = authReducer(
      getInitialState(),
      resetPassword.pending('', resetPayload)
    );
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('resetPassword fulfilled', () => {
    const state = authReducer(
      getInitialState(),
      resetPassword.fulfilled({ success: true }, '', resetPayload)
    );
    expect(state.isLoading).toBe(false);
    expect(state.resetPasswordSuccess).toBe(true);
  });

  test('resetPassword rejected', () => {
    const state = authReducer(
      getInitialState(),
      resetPassword.rejected(null, '', resetPayload, 'Reset error')
    );
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Reset error');
  });
});

describe('Асинхронные екшены тесты авторизации', () => {
  const user = { email: 'test@example.com', name: 'Test User' };
  const authPayload = {
    accessToken: 'access',
    refreshToken: 'refresh',
    user,
    success: true
  };
  const registerPayload = {
    email: 'test@mail.ru',
    name: 'Pasha',
    password: '123'
  };
  const loginPayload = { email: 'test@mail.ru', password: '123' };
  const updatePayload = { name: 'Pasha' };
  const forgotPayload = { email: 'test@mail.ru' };
  const resetPayload = { password: '123', token: 'reset' };

  test('registerUser fulfilled', async () => {
    apiMock.registerUserApi.mockResolvedValue(authPayload);
    const dispatch = jest.fn();
    const getState = jest.fn();
    const thunk = registerUser(registerPayload);
    const result = await thunk(dispatch, getState, undefined);
    expect(apiMock.registerUserApi).toHaveBeenCalledWith(registerPayload);
    expect(result.type).toBe('auth/register/fulfilled');
  });

  test('registerUser rejected', async () => {
    apiMock.registerUserApi.mockRejectedValue(new Error('Register error'));
    const dispatch = jest.fn();
    const getState = jest.fn();
    const thunk = registerUser(registerPayload);
    const result = await thunk(dispatch, getState, undefined);
    expect(result.type).toBe('auth/register/rejected');
  });

  test('loginUser fulfilled', async () => {
    apiMock.loginUserApi.mockResolvedValue(authPayload);
    const dispatch = jest.fn();
    const getState = jest.fn();
    const thunk = loginUser(loginPayload);
    const result = await thunk(dispatch, getState, undefined);
    expect(apiMock.loginUserApi).toHaveBeenCalledWith(loginPayload);
    expect(result.type).toBe('auth/login/fulfilled');
  });

  test('loginUser rejected', async () => {
    apiMock.loginUserApi.mockRejectedValue(new Error('Login error'));
    const dispatch = jest.fn();
    const getState = jest.fn();
    const thunk = loginUser(loginPayload);
    const result = await thunk(dispatch, getState, undefined);
    expect(result.type).toBe('auth/login/rejected');
  });

  test('logoutUser fulfilled', async () => {
    apiMock.logoutApi.mockResolvedValue({ success: true });
    const dispatch = jest.fn();
    const getState = jest.fn();
    const thunk = logoutUser();
    const result = await thunk(dispatch, getState, undefined);
    expect(apiMock.logoutApi).toHaveBeenCalled();
    expect(result.type).toBe('auth/logout/fulfilled');
  });

  test('logoutUser rejected', async () => {
    apiMock.logoutApi.mockRejectedValue(new Error('Logout error'));
    const dispatch = jest.fn();
    const getState = jest.fn();
    const thunk = logoutUser();
    const result = await thunk(dispatch, getState, undefined);
    expect(result.type).toBe('auth/logout/rejected');
  });

  test('fetchUser fulfilled', async () => {
    apiMock.getUserApi.mockResolvedValue({ success: true, user });
    const dispatch = jest.fn();
    const getState = jest.fn();
    const thunk = fetchUser();
    const result = await thunk(dispatch, getState, undefined);
    expect(apiMock.getUserApi).toHaveBeenCalled();
    expect(result.type).toBe('auth/getUser/fulfilled');
  });

  test('fetchUser rejected', async () => {
    apiMock.getUserApi.mockRejectedValue(new Error('Fetch error'));
    const dispatch = jest.fn();
    const getState = jest.fn();
    const thunk = fetchUser();
    const result = await thunk(dispatch, getState, undefined);
    expect(result.type).toBe('auth/getUser/rejected');
  });

  test('updateUser fulfilled', async () => {
    apiMock.updateUserApi.mockResolvedValue({ success: true, user });
    const dispatch = jest.fn();
    const getState = jest.fn();
    const thunk = updateUser(updatePayload);
    const result = await thunk(dispatch, getState, undefined);
    expect(apiMock.updateUserApi).toHaveBeenCalledWith(updatePayload);
    expect(result.type).toBe('auth/updateUser/fulfilled');
  });

  test('updateUser rejected', async () => {
    apiMock.updateUserApi.mockRejectedValue(new Error('Update error'));
    const dispatch = jest.fn();
    const getState = jest.fn();
    const thunk = updateUser(updatePayload);
    const result = await thunk(dispatch, getState, undefined);
    expect(result.type).toBe('auth/updateUser/rejected');
  });

  test('forgotPassword fulfilled', async () => {
    apiMock.forgotPasswordApi.mockResolvedValue({ success: true });
    const dispatch = jest.fn();
    const getState = jest.fn();
    const thunk = forgotPassword(forgotPayload);
    const result = await thunk(dispatch, getState, undefined);
    expect(apiMock.forgotPasswordApi).toHaveBeenCalledWith(forgotPayload);
    expect(result.type).toBe('auth/forgotPassword/fulfilled');
  });

  test('forgotPassword rejected', async () => {
    apiMock.forgotPasswordApi.mockRejectedValue(new Error('Forgot error'));
    const dispatch = jest.fn();
    const getState = jest.fn();
    const thunk = forgotPassword(forgotPayload);
    const result = await thunk(dispatch, getState, undefined);
    expect(result.type).toBe('auth/forgotPassword/rejected');
  });

  test('resetPassword fulfilled', async () => {
    apiMock.resetPasswordApi.mockResolvedValue({ success: true });
    const dispatch = jest.fn();
    const getState = jest.fn();
    const thunk = resetPassword(resetPayload);
    const result = await thunk(dispatch, getState, undefined);
    expect(apiMock.resetPasswordApi).toHaveBeenCalledWith(resetPayload);
    expect(result.type).toBe('auth/resetPassword/fulfilled');
  });

  test('resetPassword rejected', async () => {
    apiMock.resetPasswordApi.mockRejectedValue(new Error('Reset error'));
    const dispatch = jest.fn();
    const getState = jest.fn();
    const thunk = resetPassword(resetPayload);
    const result = await thunk(dispatch, getState, undefined);
    expect(result.type).toBe('auth/resetPassword/rejected');
  });
});
