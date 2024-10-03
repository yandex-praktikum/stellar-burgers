import { describe, expect, test } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import {
  userMockData,
  userMockDataUpdated,
  userRegisterData,
  userRegisterDataUpdated,
  userResponce,
  userResponceUpdated
} from './testData';
import {
  isAuthCheckedSelector,
  getUser,
  getName,
  getError,
  userSlice,
  initialState,
  register,
  login,
  apiGetUser,
  updateUser,
  logout
} from './user';

describe('Тестируем user', () => {
  const stateConstructor = (action: { type: string; payload?: {} }) =>
    userSlice.reducer(initialState, action);

  test('Тесты селекторов  isAuthCheckedSelector, getUser, getName, getError, ', () => {
    const store = configureStore({
      reducer: {
        user: userSlice.reducer
      },
      preloadedState: {
        user: userMockData
      }
    });
    const isAuthChecked = isAuthCheckedSelector(store.getState());
    const user = getUser(store.getState());
    const name = getName(store.getState());
    const error = getError(store.getState());
    expect(isAuthChecked).toEqual(userMockData.isAuthChecked);
    expect(user).toEqual(userMockData.user);
    expect(name).toEqual(userMockData.user.name);
    expect(error).toEqual(userMockData.error);
  });

  test('Тесты редьюсера register, проверка fulfilled', () => {
    const action = {
      type: register.fulfilled.type,
      payload: userResponce
    };
    expect(stateConstructor(action)).toEqual(userMockData);
  });

  test('Тесты редьюсера register, проверка rejected', () => {
    const newState = userSlice.reducer(
      initialState,
      register.rejected(new Error('error'), 'тестовая ошибка', userRegisterData)
    );
    expect(newState.error).toEqual('error');
  });

  test('Тесты редьюсера register,проверка pending', () => {
    const newState = userSlice.reducer(
      initialState,
      register.pending('', userRegisterData)
    );
    expect(newState.isAuthChecked).toEqual(false);
    expect(newState.error).toEqual('');
  });

  test('Тесты редьюсера login, проверка fulfilled', () => {
    const action = {
      type: login.fulfilled.type,
      payload: userResponce
    };
    expect(stateConstructor(action)).toEqual(userMockData);
  });

  test('Тесты редьюсера login, проверка rejected', () => {
    const newState = userSlice.reducer(
      initialState,
      login.rejected(new Error('error'), 'тестовая ошибка', userRegisterData)
    );
    expect(newState.error).toEqual('error');
    expect(newState.isAuthChecked).toEqual(false);
  });

  test('Тесты редьюсера login,проверка pending', () => {
    const newState = userSlice.reducer(
      initialState,
      login.pending('', userRegisterData)
    );
    expect(newState.isAuthChecked).toEqual(false);
    expect(newState.error).toEqual('');
  });

  test('Тесты редьюсера apiGetUser, проверка fulfilled', () => {
    const action = {
      type: apiGetUser.fulfilled.type,
      payload: userResponce
    };
    expect(stateConstructor(action)).toEqual(userMockData);
  });

  test('Тесты редьюсера apiGetUser, проверка rejected', () => {
    const newState = userSlice.reducer(
      initialState,
      apiGetUser.rejected(new Error('error'), 'тестовая ошибка')
    );
    expect(newState.error).toEqual('error');
    expect(newState.isAuthChecked).toEqual(false);
  });

  test('Тесты редьюсера updateUser, проверка fulfilled', () => {
    const action = {
      type: updateUser.fulfilled.type,
      payload: userResponceUpdated
    };
    expect(stateConstructor(action)).toEqual(userMockDataUpdated);
  });

  test('Тесты редьюсера updateUser, проверка rejected', () => {
    const newState = userSlice.reducer(
      initialState,
      updateUser.rejected(
        new Error('error'),
        'тестовая ошибка',
        userRegisterDataUpdated
      )
    );
    expect(newState.error).toEqual('error');
    expect(newState.isAuthChecked).toEqual(false);
  });

  test('Тесты редьюсера updateUser,проверка pending', () => {
    const newState = userSlice.reducer(
      initialState,
      updateUser.pending('', userRegisterDataUpdated)
    );
    expect(newState.isAuthChecked).toEqual(false);
    expect(newState.error).toEqual('');
  });

  test('Тесты редьюсера logout, проверка fulfilled', () => {
    const action = {
      type: logout.fulfilled.type,
      payload: userResponce
    };
    expect(stateConstructor(action)).toEqual(initialState);
  });
});
