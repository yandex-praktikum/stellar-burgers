import {
  userSlice,
  setUserCheck,
  getUser,
  updateUser,
  initialStateUser
} from '@slices';

describe('User slice', () => {
  describe('Synchronous reducer', () => {
    it('should set user check flag', () => {
      const action = setUserCheck();
      const newState = userSlice.reducer(initialStateUser, action);

      expect(newState.checkUser).toBe(true);
    });
  });

  describe('Asynchronous reducers', () => {
    it('should handle fulfilled state of getUser (authorization)', () => {
      const mockUser = {
        user: {
          email: 'testEmail',
          name: 'testName'
        }
      };
      const action = { type: getUser.fulfilled.type, payload: mockUser };
      const nextState = userSlice.reducer(initialStateUser, action);

      expect(nextState.email).toEqual(mockUser.user.email);
      expect(nextState.name).toEqual(mockUser.user.name);
    });

    it('should handle fulfilled state of updateUser', () => {
      const mockUser = {
        user: {
          email: 'newEmail',
          name: 'newName'
        }
      };
      const action = { type: updateUser.fulfilled.type, payload: mockUser };
      const nextState = userSlice.reducer(initialStateUser, action);

      expect(nextState.email).toEqual(mockUser.user.email);
      expect(nextState.name).toEqual(mockUser.user.name);
    });

    it('should handle rejected state of getUser without changing state', () => {
      const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const action = {
        type: getUser.rejected.type,
        error: { message: 'Fetch error' }
      };
      const nextState = userSlice.reducer(initialStateUser, action);

      expect(nextState).toEqual(initialStateUser);
      expect(spy).toHaveBeenCalledWith('getUser rejected:', 'Fetch error');

      spy.mockRestore();
    });
  });
});
