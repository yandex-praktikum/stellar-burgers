import { TUser } from '../src/utils/types';
import userSlice, {
  fetchUpdateUser,
  fetchLoginUser,
  fetchLogoutUser,
  fetchGetUser,
  fetchRegisterUser
} from '../src/services/slices/userSlice';

describe('Тестирование userSlice', () => {
  const reducer = userSlice.reducer;
  const initialState = {
    isUserCheckInProgress: false,
    user: null,
    error: null
  };
  const testUser: TUser = {
    email: 'test@mail.ru',
    name: 'testUser'
  };
  const testRegisterData = {
    email: 'test@mail.ru',
    name: 'testUser',
    password: 'password'
  };
  const testLoginData = {
    email: 'test@mail.ru',
    password: 'password'
  };
  describe('Тестирование проверки пользователя', () => {
    test('Тестирование проверки пользователя (pending)', () => {
      const expectedState = {
        ...initialState,
        isUserCheckInProgress: true
      };
      const newState = reducer(initialState, fetchGetUser.pending(''));
      expect(newState).toEqual(expectedState);
    });
    test('Тестирование проверки пользователя - успешно (fulfilled)', () => {
      const expectedState = {
        ...initialState,
        user: testUser
      };
      const testResponse = {
        success: true,
        user: testUser
      };
      const newState = reducer(
        initialState,
        fetchGetUser.fulfilled(testResponse, '')
      );
      expect(newState).toEqual(expectedState);
    });
    test('Тестирование проверки пользователя - ошибка (rejected)', () => {
      const error = new Error('Test error');
      const expectedState = {
        ...initialState,
        error: error.message
      };
      const newState = reducer(initialState, fetchGetUser.rejected(error, ''));
      expect(newState).toEqual(expectedState);
    });
  });

  describe('Тестирование регистрации пользователя', () => {
    test('Тестирование регистрации пользователя (pending)', () => {
      const expectedState = {
        ...initialState,
        isUserCheckInProgress: true
      };
      const newState = reducer(
        initialState,
        fetchRegisterUser.pending('', testRegisterData)
      );
      expect(newState).toEqual(expectedState);
    });
    test('Тестирование регистрации пользователя - успешно (fulfilled)', () => {
      const expectedState = {
        ...initialState,
        user: testUser
      };
      const testResponse = {
        success: true,
        refreshToken: 'test-refreshToken',
        accessToken: 'test-accessToken',
        user: testUser
      };
      const newState = reducer(
        initialState,
        fetchRegisterUser.fulfilled(testResponse, '', testRegisterData)
      );
      expect(newState).toEqual(expectedState);
      expect(document.cookie).toContain('accessToken=test-accessToken');
      expect(localStorage.getItem('refreshToken')).toBe('test-refreshToken');
    });
    test('Тестирование регистрации пользователя - ошибка (rejected)', () => {
      const error = new Error('Test error');
      const expectedState = {
        ...initialState,
        error: error.message
      };
      const newState = reducer(
        initialState,
        fetchRegisterUser.rejected(error, '', testRegisterData)
      );
      expect(newState).toEqual(expectedState);
    });
  });

  describe('Тестирование логина пользователя', () => {
    test('Тестирование логина пользователя (pending)', () => {
      const expectedState = {
        ...initialState,
        isUserCheckInProgress: true
      };
      const newState = reducer(
        initialState,
        fetchLoginUser.pending('', testLoginData)
      );
      expect(newState).toEqual(expectedState);
    });
    test('Тестирование логина пользователя - успешно (fulfilled)', () => {
      const expectedState = {
        ...initialState,
        user: testUser
      };
      const testResponse = {
        success: true,
        refreshToken: 'test-refreshToken',
        accessToken: 'test-accessToken',
        user: testUser
      };
      const newState = reducer(
        initialState,
        fetchLoginUser.fulfilled(testResponse, '', testLoginData)
      );
      expect(newState).toEqual(expectedState);
      expect(document.cookie).toContain('accessToken=test-accessToken');
      expect(localStorage.getItem('refreshToken')).toBe('test-refreshToken');
    });
    test('Тестирование логина пользователя - ошибка (rejected)', () => {
      const error = new Error('Test error');
      const expectedState = {
        ...initialState,
        error: error.message
      };
      const newState = reducer(
        initialState,
        fetchLoginUser.rejected(error, '', testLoginData)
      );
      expect(newState).toEqual(expectedState);
    });
  });

  describe('Тестирование логаута пользователя', () => {
    test('Тестирование логаута пользователя (pending)', () => {
      const expectedState = {
        ...initialState,
        isUserCheckInProgress: true
      };
      const newState = reducer(initialState, fetchLogoutUser.pending(''));
      expect(newState).toEqual(expectedState);
    });
    test('Тестирование логаута пользователя - успешно (fulfilled)', () => {
      const stateWithUser = {
        ...initialState,
        user: testUser
      };
      const expectedState = {
        ...initialState,
        user: null
      };
      document.cookie = 'accessToken=test-accessToken';
      localStorage.setItem('refreshToken', 'test-refreshToken');
      const testResponse = {
        success: true
      };
      const newState = reducer(
        stateWithUser,
        fetchLogoutUser.fulfilled(testResponse, '')
      );
      expect(newState).toEqual(expectedState);
      expect(document.cookie).not.toContain('accessToken=test-accessToken');
      expect(localStorage.getItem('refreshToken')).not.toBe(
        'test-refreshToken'
      );
    });
    test('Тестирование логаута пользователя - ошибка (rejected)', () => {
      const error = new Error('Test error');
      const expectedState = {
        ...initialState,
        error: error.message
      };
      const newState = reducer(
        initialState,
        fetchLogoutUser.rejected(error, '')
      );
      expect(newState).toEqual(expectedState);
    });
  });

  describe('Тестирование обновления данных пользователя', () => {
    test('Тестирование обновления данных пользователя (pending)', () => {
      const expectedState = {
        ...initialState,
        isUserCheckInProgress: true
      };
      const newState = reducer(
        initialState,
        fetchUpdateUser.pending('', testRegisterData)
      );
      expect(newState).toEqual(expectedState);
    });
    test('Тестирование обновления данных пользователя - успешно (fulfilled)', () => {
      const stateWithUser = {
        ...initialState,
        user: testUser
      };
      const updatedUser = {
        name: 'newUser',
        email: 'newUser@mail.ru'
      };
      const expectedState = {
        ...initialState,
        user: updatedUser
      };
      const testResponse = {
        success: true,
        user: updatedUser
      };
      const newState = reducer(
        stateWithUser,
        fetchUpdateUser.fulfilled(testResponse, '', testRegisterData)
      );
      expect(newState).toEqual(expectedState);
    });
    test('Тестирование обновления данных пользователя - ошибка (rejected)', () => {
      const error = new Error('Test error');
      const expectedState = {
        ...initialState,
        error: error.message
      };
      const newState = reducer(
        initialState,
        fetchUpdateUser.rejected(error, '', testRegisterData)
      );
      expect(newState).toEqual(expectedState);
    });
  });
});
