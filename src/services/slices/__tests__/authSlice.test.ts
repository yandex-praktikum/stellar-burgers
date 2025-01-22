import {
  login,
  logout,
  getUser,
  register,
  updateUser,
  authInitialState
} from '../authSlice';
import { TUser } from '../../../utils/types';
import reducer from '../authSlice';

// Моковые данные для пользователя
const registerMockData = {
  email: 'test@example.mail',
  name: 'Test',
  password: 'Test'
};

const userMockData: TUser = {
  email: 'test@example.com',
  name: 'Test User'
};

const loginMockData = {
  email: 'test@example.mail',
  password: 'Test'
};

const loginResponseMockData = {
  success: true,
  user: userMockData,
  accessToken: 'accessToken',
  refreshToken: 'refreshToken'
};

describe('Тестирование редьюсера слайса authSlice', () => {
  describe('Асинхронная функция для входа: login', () => {
    test('Начало запроса: login.pending', () => {
      const state = reducer(
        authInitialState,
        login.pending('pending', loginMockData)
      );

      // Проверяем, что isLoading становится true, а errorRegister остается null
      expect(state.isLoading).toBeTruthy();
      expect(state.errorRegister).toBeNull();
    });

    test('Результат запроса: login.fulfilled', () => {
      const state = reducer(
        authInitialState,
        login.fulfilled(loginResponseMockData, 'fulfilled', loginMockData)
      );

      // Проверяем, что isLoading становится false, isAuthenticated становится true, userData обновляется
      expect(state.isLoading).toBeFalsy();
      expect(state.isAuthenticated).toBeTruthy();
      expect(state.userData).toEqual(userMockData);
    });

    test('Ошибка запроса: login.rejected', () => {
      const error = { message: 'Ошибка входа' };

      const state = reducer(
        authInitialState,
        login.rejected(new Error(error.message), 'requestId', loginMockData)
      );

      // Проверяем, что isLoading становится false, ошибка записывается в errorRegister
      expect(state.isLoading).toBeFalsy();
      expect(state.errorRegister?.message).toEqual(error.message);
    });
  });

  describe('Асинхронная функция для выхода: logout', () => {
    test('Начало запроса: logout.pending', () => {
      const state = reducer(authInitialState, logout.pending('requestId'));

      // Проверяем, что isLoading становится true
      expect(state.isLoading).toBeTruthy();
    });

    test('Результат запроса: logout.fulfilled', () => {
      const state = reducer(
        authInitialState,
        logout.fulfilled(undefined, 'requestId')
      );

      // Проверяем, что isLoading становится false, userData сбрасывается, isAuthenticated становится false
      expect(state.isLoading).toBeFalsy();
      expect(state.userData).toBeNull();
      expect(state.isAuthenticated).toBeFalsy();
    });

    test('Ошибка запроса: logout.rejected', () => {
      const error = { message: 'Ошибка выхода' };

      const state = reducer(
        authInitialState,
        logout.rejected(new Error(error.message), 'requestId')
      );

      // Проверяем, что isLoading становится false, ошибка записывается в errorRegister
      expect(state.isLoading).toBeFalsy();
      expect(state.errorRegister?.message).toEqual(error.message);
    });
  });

  describe('Асинхронная функция для проверки пользователя: getUser', () => {
    test('Начало запроса: getUser.pending', () => {
      const state = reducer(authInitialState, getUser.pending('requestId'));

      // Проверяем, что authChecked становится false
      expect(state.authChecked).toBeFalsy();
    });

    test('Результат запроса: getUser.fulfilled', () => {
      const state = reducer(
        authInitialState,
        getUser.fulfilled({ user: userMockData, success: true }, 'requestId')
      );

      // Проверяем, что authChecked становится true, isAuthenticated становится true, userData обновляется
      expect(state.authChecked).toBeTruthy();
      expect(state.isAuthenticated).toBeTruthy();
      expect(state.userData).toEqual(userMockData);
    });

    test('Ошибка запроса: getUser.rejected', () => {
      const state = reducer(
        authInitialState,
        getUser.rejected(new Error('Ошибка проверки пользователя'), 'requestId')
      );

      // Проверяем, что authChecked становится true
      expect(state.authChecked).toBeTruthy();
    });
  });

  describe('Асинхронная функция для регистрации: register', () => {
    test('Начало запроса: register.pending', () => {
      const state = reducer(
        authInitialState,
        register.pending('requestId', registerMockData)
      );

      // Проверяем, что isLoading становится true, а errorRegister остается null
      expect(state.isLoading).toBeTruthy();
      expect(state.errorRegister).toBeNull();
    });

    test('Результат запроса: register.fulfilled', () => {
      const state = reducer(
        authInitialState,
        register.fulfilled(loginResponseMockData, 'fulfilled', registerMockData)
      );

      // Проверяем, что isLoading становится false, isAuthenticated становится true, userData обновляется
      expect(state.isLoading).toBeFalsy();
      expect(state.isAuthenticated).toBeTruthy();
      expect(state.userData).toEqual(userMockData);
    });

    test('Ошибка запроса: register.rejected', () => {
      const error = { message: 'Ошибка регистрации' };

      const state = reducer(
        authInitialState,
        register.rejected(
          new Error(error.message),
          'requestId',
          registerMockData
        )
      );

      // Проверяем, что isLoading становится false, ошибка записывается в errorRegister
      expect(state.isLoading).toBeFalsy();
      expect(state.errorRegister?.message).toEqual(error.message);
    });
  });

  describe('Асинхронная функция для обновления пользователя: updateUser', () => {
    test('Результат запроса: updateUser.fulfilled', () => {
      const updatedUserMockData: TUser = {
        email: 'updated@example.com',
        name: 'Updated User'
      };

      const state = reducer(
        authInitialState,
        updateUser.fulfilled(updatedUserMockData, 'requestId', {
          email: 'updated@example.com',
          name: 'Updated User'
        })
      );

      // Проверяем, что userData обновляется
      expect(state.userData).toEqual(updatedUserMockData);
    });
  });
});
