// // profileUserSlice.test.ts
// import { profileSlice, getUser, updateUser, profileLogin, userLogout } from './profileUserSlice';

// describe('profileUserSlice', () => {
//   const initialState = {
//     user: null,
//     isDataLoading: false,
//     error: null,
//     isLoading: false
//   };

//   it('обрабатывает экшен getUser.pending', () => {
//     const action = { type: getUser.pending.type };
//     const state = profileSlice.reducer(initialState, action);
//     expect(state.isLoading).toBe(true);
//     expect(state.error).toBeNull();
//   });

//   it('обрабатывает экшен getUser.fulfilled', () => {
//     const action = { type: getUser.fulfilled.type, payload: { user: { name: 'Иван', email: 'ivan@mail.ru' } } };
//     const state = profileSlice.reducer(initialState, action);
//     expect(state.isLoading).toBe(false);
//     expect(state.user).toEqual({ name: 'Иван', email: 'ivan@mail.ru' });
//   });

//   it('обрабатывает экшен getUser.rejected', () => {
//     const action = { type: getUser.rejected.type, error: { message: 'Ошибка' } };
//     const state = profileSlice.reducer(initialState, action);
//     expect(state.isLoading).toBe(false);
//     expect(state.error).toBe('Ошибка');
//   });

//   it('обрабатывает экшен updateUser.fulfilled', () => {
//     const action = { type: updateUser.fulfilled.type, payload: { user: { name: 'Ольга', email: 'olga@mail.ru' } } };
//     const state = profileSlice.reducer(initialState, action);
//     expect(state.user).toEqual({ name: 'Ольга', email: 'olga@mail.ru' });
//   });

//   it('обрабатывает экшен profileLogin.fulfilled', () => {
//     const action = { type: profileLogin.fulfilled.type, payload: { name: 'Петр', email: 'petr@mail.ru' } };
//     const state = profileSlice.reducer(initialState, action);
//     expect(state.user).toEqual({ name: 'Петр', email: 'petr@mail.ru' });
//   });

//   it('обрабатывает экшен userLogout.fulfilled', () => {
//     const stateWithUser = {
//       user: { name: 'Иван', email: 'ivan@mail.ru' },
//       isDataLoading: false,
//       error: null,
//       isLoading: false
//     };
//     const action = { type: userLogout.fulfilled.type };
//     const state = profileSlice.reducer(stateWithUser, action);
//     expect(state.user).toBeNull();
//   });
// });
