import { configureStore } from '@reduxjs/toolkit';
import {
  apiGetUser,
  getErrorSelector,
  getNameSelector,
  getUserSelector,
  isAuthCheckedSelector,
  logout,
  registerFetch,
  TUserState,
  updateUser,
  userReducer
} from './userSlice';

const testStore = () =>
  configureStore({
    reducer: {
      user: userReducer
    }
  });

const userData: TUserState = {
  isAuthChecked: false,
  user: {
    name: 'test',
    email: 'test@test.com'
  },
  error: undefined
};

describe('userSlice', () => {
  describe('login', () => {
    const store = testStore();
    test('login pending', () => {
      store.dispatch({ type: apiGetUser.pending.type });
      const state = store.getState();
      expect(state.user.isAuthChecked).toBe(false);
      expect(state.user.error).toBe('');
    });

    test('login fulfilled', () => {
      store.dispatch({ type: apiGetUser.fulfilled.type, payload: userData });
      const state = store.getState();
      //   const isAuthChecked = isAuthCheckedSelector(state);
      expect(state.user.isAuthChecked).toBe(true);
      expect(state.user.user).toBe(userData.user);
      expect(state.user.error).toBe('');
    });

    test('login rejected', () => {
      const errorMessage = 'rejected message';
      store.dispatch({
        type: apiGetUser.rejected.type,
        error: { message: errorMessage }
      });

      const state = store.getState();
      expect(state.user.isAuthChecked).toBe(false);
      expect(state.user.error).toBe(errorMessage);
    });
  });

  describe('register', () => {
    const store = testStore();
    test('register fulfilled', () => {
      store.dispatch({ type: registerFetch.fulfilled.type, payload: userData });
      const state = store.getState();
      expect(state.user.isAuthChecked).toBe(true);
      expect(state.user.user).toBe(userData.user);
      expect(state.user.error).toBe('');
    });

    test('register pending', () => {
      store.dispatch({ type: registerFetch.pending.type });
      const state = store.getState();
      expect(state.user.error).toBe('');
    });

    test('register rejected', () => {
      const errorMessage = 'rejected message';
      store.dispatch({
        type: registerFetch.rejected.type,
        error: { message: errorMessage }
      });
      const state = store.getState();
      expect(state.user.error).toBe(errorMessage);
    });
  });

  describe('logout', () => {
    const store = testStore();
    test('logout fulfilled', () => {
      store.dispatch({ type: logout.fulfilled.type, payload: userData });
      const state = store.getState();
      expect(state.user.isAuthChecked).toBe(false);
      expect(state.user.user).toEqual({ email: '', name: '' });
    });
  });

  describe('update', () => {
    const store = testStore();
    test('update fulfilled', () => {
      store.dispatch({
        type: updateUser.fulfilled.type,
        payload: { user: { name: 'vasek', email: userData.user.email } }
      });
      const state = store.getState();
      expect(state.user.isAuthChecked).toBe(true);
      expect(state.user.user).toEqual({
        name: 'vasek',
        email: userData.user.email
      });
    });

    test('update pending', () => {
      store.dispatch({ type: updateUser.pending.type });
      const state = store.getState();
      expect(state.user.error).toBe('');
    });

    test('update rejected', () => {
      const errorMessage = 'rejected message';
      store.dispatch({
        type: updateUser.rejected.type,
        error: { message: errorMessage }
      });
      const state = store.getState();
      expect(state.user.error).toBe(errorMessage);
    });
  });

  describe('selectors', () => {
    const store = testStore();
    const state = store.getState();
    test('isAuthCheckedSelector', () => {
      const isAuthChecked = isAuthCheckedSelector(state);
      expect(isAuthChecked).toBe(false);
    });

    test('getUserSelector', () => {
      const getUser = getUserSelector(state);
      expect(getUser).toBe(state.user.user);
    });

    test('getNameSelector', () => {
      store.dispatch({
        type: updateUser.fulfilled.type,
        payload: { user: { name: 'vasek', email: userData.user.email } }
      });
      const state = store.getState();
      const getName = getNameSelector(state);
      expect(getName).toBe(state.user.user.name);
    });

    test('getErrorSelector', () => {
      const errorMessage = 'error message';
      store.dispatch({
        type: updateUser.rejected.type,
        error: { message: errorMessage }
      });
      const state = store.getState();
      const getError = getErrorSelector(state);
      expect(getError).toEqual(errorMessage);
    });
  });
});
