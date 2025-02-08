import { describe, it, expect } from '@jest/globals';
import userSlice, {
  fetchGetUser,
  fetchUserLogin,
  fetchUserLogout,
  fetchUserRegister,
  fetchUserUpdate,
  initialState
} from './userSlice';
import * as userRegisterAction from '../../../cypress/fixtures/userRegister.json';
import * as userLoginAction from '../../../cypress/fixtures/userLogin.json';
import * as userUpdateAction from '../../../cypress/fixtures/userUpdate.json';
import * as userGetAction from '../../../cypress/fixtures/userGet.json';

describe('Тестирование работы с пользовтелем', () => {
  it('Регистрация пользователя', () => {
    expect(
      userSlice.reducer(undefined, {
        type: fetchUserRegister.pending.type,
        payload: {}
      })
    ).toEqual({ ...initialState, isLoading: true, isError: false });
    expect(
      userSlice.reducer(undefined, {
        type: fetchUserRegister.rejected.type,
        error: { message: 'error' }
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      isError: true,
      errorText: 'error'
    });
    expect(
      userSlice.reducer(undefined, {
        type: fetchUserRegister.fulfilled.type,
        payload: userRegisterAction.payload
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      isError: false,
      email: userRegisterAction.payload.user.email,
      name: userRegisterAction.payload.user.name,
      isRegistered: true
    });
  });
  it('Логин пользователя', () => {
    expect(
      userSlice.reducer(undefined, {
        type: fetchUserLogin.pending.type,
        payload: {}
      })
    ).toEqual({ ...initialState, isLoading: true, isError: false });
    expect(
      userSlice.reducer(undefined, {
        type: fetchUserLogin.rejected.type,
        error: { message: 'error' }
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      isError: true,
      errorText: 'error'
    });
    expect(
      userSlice.reducer(undefined, {
        type: fetchUserLogin.fulfilled.type,
        payload: userLoginAction.payload
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      isError: false,
      email: userRegisterAction.payload.user.email,
      name: userRegisterAction.payload.user.name
    });
  });
  it('Выход пользователя', () => {
    expect(
      userSlice.reducer(undefined, {
        type: fetchUserLogout.pending.type,
        payload: {}
      })
    ).toEqual({ ...initialState, isLoading: true, isError: false });
    expect(
      userSlice.reducer(undefined, {
        type: fetchUserLogout.rejected.type,
        error: { message: 'error' }
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      isError: true,
      errorText: 'error'
    });
    expect(
      userSlice.reducer(undefined, {
        type: fetchUserLogout.fulfilled.type,
        payload: {}
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      isError: false,
      errorText: '',
      email: '',
      name: ''
    });
  });
  it('Обновление пользователя', () => {
    expect(
      userSlice.reducer(undefined, {
        type: fetchUserUpdate.pending.type,
        meta: {
          arg: {
            email: 'email',
            name: 'name'
          }
        }
      })
    ).toEqual({
      ...initialState,
      isLoading: true,
      isError: false,
      email: 'email',
      name: 'name'
    });
    expect(
      userSlice.reducer(undefined, {
        type: fetchUserUpdate.rejected.type,
        error: { message: 'error' }
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      isError: true,
      errorText: 'error',
      isRegistered: false
    });
    expect(
      userSlice.reducer(undefined, {
        type: fetchUserUpdate.fulfilled.type,
        payload: userUpdateAction.payload
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      isError: false,
      email: userUpdateAction.payload.user.email,
      name: userUpdateAction.payload.user.name
    });
  });
  it('Получение данных пользователя', () => {
    expect(
      userSlice.reducer(undefined, {
        type: fetchGetUser.pending.type,
        payload: {}
      })
    ).toEqual({ ...initialState, isLoading: true, isError: false });
    expect(
      userSlice.reducer(undefined, {
        type: fetchGetUser.rejected.type,
        error: { message: 'error' }
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      isError: true,
      errorText: 'error'
    });
    expect(
      userSlice.reducer(undefined, {
        type: fetchGetUser.fulfilled.type,
        payload: userGetAction.payload
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      isError: false,
      name: userGetAction.payload.user.name,
      email: userGetAction.payload.user.email
    });
  });
});
