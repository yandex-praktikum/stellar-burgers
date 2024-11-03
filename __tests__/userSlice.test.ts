import {
  getUser,
  updateUser,
  register,
  login,
  logoutUser,
} from '../src/services/slices/userSlice';

import { initialState } from '../src/services/slices/userSlice';

import userSliceReducer from '../src/services/slices/userSlice';

const userMockData = {
  email: 'test@test.test',
  name: 'testtest'
};

const registerMockData = {
  email: 'test@test.test',
  name: 'testtest',
  password: 'testtest'
};

const loginMockData = {
  email: 'test@test.test',
  password: 'testtest'
};

describe('Тестирование userSlice', () => {
  // Регистрация
  describe('Функция для регистрации: register', () => {
    test('Начало запроса: register.pending', () => {
      const state = userSliceReducer(
        initialState,
        register.pending('pending', registerMockData)
      );
      expect(state.registerError).toBeUndefined();
    });

    test('Результат запроса: register.fulfilled', () => {
      const state = userSliceReducer(
        initialState,
        register.fulfilled(userMockData, 'fulfilled', registerMockData)
      );
      expect(state.isAuthenticated).toBeTruthy();
      expect(state.registerError).toBeUndefined();
      expect(state.data).toEqual(userMockData);
    });

    test('Ошибка запроса: register.rejected', () => {
      const error = 'register.rejected';
      const state = userSliceReducer(
        initialState,
        register.rejected(new Error(error), 'rejected', registerMockData)
      );
      expect(state.registerError?.message).toEqual(error);
    });
  });

  describe('Функция для входа в аккаунт: logoutUser', () => {
    test('Начало запроса: logoutUser.pending', () => {
      const state = userSliceReducer(
        initialState,
        login.pending('pending', loginMockData)
      );
      expect(state.loginError).toBeUndefined();
    });

    test('Результат запроса: logoutUser.fulfilled', () => {
      const state = userSliceReducer(
        initialState,
        login.fulfilled(userMockData, 'fulfilled', loginMockData)
      );
      expect(state.isAuthenticated).toBeTruthy();
      expect(state.loginError).toBeUndefined();
      expect(state.data).toEqual(userMockData);
    });

    test('Ошибка запроса: logoutUser.rejected', () => {
      const error = 'logoutUser.rejected';
      const state = userSliceReducer(
        initialState,
        login.rejected(new Error(error), 'rejected', loginMockData)
      );
      expect(state.loginError?.message).toEqual(error);
    });
  });

  // Выход
  describe('Функция выхода из аккаунта: logoutUser', () => {
    test('Результат запроса: logoutUser.fulfilled', () => {
      const state = userSliceReducer(
        initialState,
        logoutUser.fulfilled(undefined, 'fulfilled')
      );
      expect(state.isAuthenticated).toBeFalsy();
      expect(state.data).toEqual({
        email: '',
        name: ''
      });
    });
  });

  describe('Функция проверки авторизации: getUser', () => {
    test('Результат запроса: getUser.fulfilled', () => {
      const state = userSliceReducer(
        initialState,
        getUser.fulfilled(userMockData, 'fulfilled')
      );
      expect(state.isAuthenticated).toBeTruthy();
      expect(state.isAuthChecked).toBeTruthy();
      expect(state.data).toEqual(userMockData);
    });

    test('Ошибка запроса: getUser.rejected', () => {
      const error = 'getUser.rejected';

      const state = userSliceReducer(
        initialState,
        getUser.rejected(new Error(error), 'rejected')
      );

      expect(state.isAuthenticated).toBeFalsy();
      expect(state.isAuthChecked).toBeTruthy();
    });
  });

  describe('Функция редактирования информации пользователя: updateUser', () => {
    test('Результат запроса: updateUser.fulfilled', () => {
      const state = userSliceReducer(
        initialState,
        updateUser.fulfilled(userMockData, 'fulfilled', userMockData)
      );
      expect(state.data).toEqual(userMockData);
    });
  });
});
