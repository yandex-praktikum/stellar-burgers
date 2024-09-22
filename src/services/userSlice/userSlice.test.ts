import userReducer, {
  initialState,
  setUser,
  setIsAuthChecked,
  clearUser,
  registerUser,
  loginUser,
  getUser,
  updateUser,
  getUserOrders
} from './userSlice';
import { TUser } from '../../utils/types';

const mockUser: TUser = {
  email: 'mail@mail.com',
  name: 'User Name'
};

describe('user slice reducers', () => {
  it('Проверка начального состояния', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('Тест для setUser', () => {
    const user = mockUser;
    const actualState = userReducer(initialState, setUser(user));
    expect(actualState.user).toEqual(user);
  });

  it('Тест для setIsAuthChecked', () => {
    const actualState = userReducer(initialState, setIsAuthChecked(true));
    expect(actualState.isAuthChecked).toBe(true);
  });

  it('Тест для clearUser', () => {
    const stateWithUser = { ...initialState, user: mockUser };
    const actualState = userReducer(stateWithUser, clearUser());
    expect(actualState.user).toBeNull();
  });

  describe('extra reducers', () => {
    it('Тест для registerUser.fulfilled', () => {
      const user = mockUser;
      const action = {
        type: registerUser.fulfilled.type,
        payload: { user, success: true }
      }; // Убедитесь, что payload соответствует редьюсеру
      const actualState = userReducer(initialState, action);
      expect(actualState.success).toBe(true);
      expect(actualState.error).toBe('');
    });

    it('Тест для registerUser.rejected', () => {
      const error = { message: 'Неудачная регистрация' };
      const action = { type: registerUser.rejected.type, error };
      const actualState = userReducer(initialState, action);
      expect(actualState.success).toBe(false);
      expect(actualState.error).toEqual(error.message);
    });

    it('Тест для loginUser.fulfilled', () => {
      const user = mockUser;
      const action = {
        type: loginUser.fulfilled.type,
        payload: { user, success: true }
      };
      const actualState = userReducer(initialState, action);
      expect(actualState.user).toEqual(user);
      expect(actualState.success).toBe(true);
      expect(actualState.error).toBe('');
    });

    it('Тест для loginUser.rejected', () => {
      const error = { message: 'Неудачный логин' };
      const action = { type: loginUser.rejected.type, payload: error.message };
      const actualState = userReducer(initialState, action);
      expect(actualState.success).toBe(false);
      expect(actualState.error).toEqual(error.message);
    });

    it('Тест для getUser.pending', () => {
      const action = { type: getUser.pending.type };
      const actualState = userReducer(initialState, action);
      expect(actualState.success).toBe(false);
      expect(actualState.isAuthChecked).toBe(false);
    });

    it('Тест для getUser.rejected', () => {
      const action = { type: getUser.rejected.type };
      const actualState = userReducer(initialState, action);
      expect(actualState.user).toBeNull();
      expect(actualState.success).toBe(false);
    });

    it('Тест для updateUser.fulfilled', () => {
      const user = mockUser;
      const action = {
        type: updateUser.fulfilled.type,
        payload: { user, success: true }
      };
      const actualState = userReducer(initialState, action);
      expect(actualState.user).toEqual(user);
      expect(actualState.error).toBe('');
    });

    it('Тест для updateUser.rejected', () => {
      const error = { message: 'Не удалось обновить данные.' };
      const action = { type: updateUser.rejected.type, error };
      const actualState = userReducer(initialState, action);
      expect(actualState.error).toEqual(error.message);
    });

    it('Тест для getUserOrders.fulfilled', () => {
      const orders = [{ ...mockUser, number: 1 }];
      const action = { type: getUserOrders.fulfilled.type, payload: orders };
      const actualState = userReducer(initialState, action);
      expect(actualState.userOrders).toEqual(orders);
      expect(actualState.request).toBe(false);
    });

    it('Тест для getUserOrders.rejected', () => {
      const error = { message: 'Ошибка получения заказов' };
      const action = { type: getUserOrders.rejected.type, error };
      const actualState = userReducer(initialState, action);
      expect(actualState.error).toEqual(error.message);
      expect(actualState.userOrders).toEqual([]);
      expect(actualState.request).toBe(false);
    });

    it('Тест для getUserOrders.pending', () => {
      const action = { type: getUserOrders.pending.type };
      const actualState = userReducer(initialState, action);
      expect(actualState.request).toBe(true);
    });
  });
});
