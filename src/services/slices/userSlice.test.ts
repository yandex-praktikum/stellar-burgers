import {
  userReducer,
  apiGetUser,
  updateUser,
  register,
  login,
  logout,
  initialState
} from './userSlice';

describe('тест асинхронных экшенов', () => {
  describe('загрузка пользователя', () => {
    it('тест apiGetUser.pending', () => {
      const action = {
        type: apiGetUser.pending.type
      };

      const newState = userReducer(initialState, action);
      expect(newState).toEqual({
        user: { email: '', name: '' },
        isAuthChecked: false,
        error: ''
      });
    });

    it('тест apiGetUser.rejected', () => {
      const action = {
        type: apiGetUser.rejected.type,
        error: { message: 'test' }
      };

      const newState = userReducer(initialState, action);
      expect(newState).toEqual({
        user: { email: '', name: '' },
        isAuthChecked: false,
        error: 'test'
      });
    });

    it('тест apiGetUser.fulfilled', () => {
      const action = {
        type: apiGetUser.fulfilled.type,
        payload: { user: 'test' }
      };

      const newState = userReducer(initialState, action);
      expect(newState).toEqual({
        user: 'test',
        isAuthChecked: true,
        error: ''
      });
    });
  });

  describe('регистрация пользователя', () => {
    it('тест register.pending', () => {
      const action = {
        type: register.pending.type
      };

      const newState = userReducer(initialState, action);
      expect(newState).toEqual({
        user: { email: '', name: '' },
        isAuthChecked: false,
        error: ''
      });
    });

    it('тест register.rejected', () => {
      const action = {
        type: register.rejected.type,
        error: { message: 'test' }
      };

      const newState = userReducer(initialState, action);
      expect(newState).toEqual({
        user: { email: '', name: '' },
        isAuthChecked: false,
        error: 'test'
      });
    });
  });

  describe('авторизация пользователя', () => {
    it('тест login.pending', () => {
      const action = {
        type: login.pending.type
      };

      const newState = userReducer(initialState, action);
      expect(newState).toEqual({
        user: { email: '', name: '' },
        isAuthChecked: false,
        error: ''
      });
    });

    it('тест login.rejected', () => {
      const action = {
        type: login.rejected.type,
        error: { message: 'test' }
      };

      const newState = userReducer(initialState, action);
      expect(newState).toEqual({
        user: { email: '', name: '' },
        isAuthChecked: false,
        error: 'test'
      });
    });

    it('тест login.fulfilled', () => {
      const action = {
        type: login.fulfilled.type,
        payload: { user: 'test' }
      };

      const newState = userReducer(initialState, action);
      expect(newState).toEqual({
        user: 'test',
        isAuthChecked: true,
        error: ''
      });
    });
  });

  describe('выход из личного кабинета', () => {
    it('тест logout.fulfilled', () => {
      const action = {
        type: logout.fulfilled.type
      };

      const newState = userReducer(initialState, action);
      expect(newState).toEqual({
        user: { email: '', name: '' },
        isAuthChecked: false,
        error: ''
      });
    });
  });

  describe('обновления профиля пользователя', () => {
    it('тест updateUser.pending', () => {
      const action = {
        type: updateUser.pending.type
      };

      const newState = userReducer(initialState, action);
      expect(newState).toEqual({
        user: { email: '', name: '' },
        isAuthChecked: false,
        error: ''
      });
    });
    it('тест updateUser.rejected', () => {
      const action = {
        type: updateUser.rejected.type,
        error: { message: 'test' }
      };

      const newState = userReducer(initialState, action);
      expect(newState).toEqual({
        user: { email: '', name: '' },
        isAuthChecked: false,
        error: 'test'
      });
    });

    it('тест updateUser.fulfilled', () => {
      const action = {
        type: updateUser.fulfilled.type,
        payload: { user: 'test' }
      };
      const newState = userReducer(initialState, action);
      expect(newState).toEqual({
        user: 'test',
        isAuthChecked: true,
        error: ''
      });
    });
  });
});
