import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  loginUser,
  registerUser,
  getUser,
  updateUser,
  logoutUser
} from './action';

export interface UserState {
  user: TUser | null;
  isAuth: boolean;
  userRequest: boolean;
  isUserChecked: boolean;
}

const initialState: UserState = {
  user: null,
  isAuth: false,
  userRequest: false,
  isUserChecked: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //авторизация пользователя
      .addCase(loginUser.pending, (state) => {
        state.userRequest = true;
      })
      .addCase(
        loginUser.fulfilled,
        (
          state,
          action: PayloadAction<{ user: TUser; accessToken: string }>
        ) => {
          state.userRequest = false;
          state.user = action.payload.user;
          state.isAuth = true;
          state.isUserChecked = true;
        }
      )
      .addCase(loginUser.rejected, (state) => {
        state.userRequest = false;
        state.isUserChecked = true;
      })
      //регистрация пользователя
      .addCase(registerUser.pending, (state) => {
        state.userRequest = true;
      })
      .addCase(
        registerUser.fulfilled,
        (
          state,
          action: PayloadAction<{ user: TUser; accessToken: string }>
        ) => {
          state.userRequest = false;
          state.user = action.payload.user;
          state.isAuth = true;
          state.isUserChecked = true;
        }
      )
      .addCase(registerUser.rejected, (state) => {
        state.userRequest = false;
        state.isUserChecked = true;
      })
      //получение данных пользователя
      .addCase(getUser.pending, (state) => {
        state.userRequest = true;
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.userRequest = false;
        state.user = action.payload;
        state.isAuth = true;
        state.isUserChecked = true;
      })
      .addCase(getUser.rejected, (state) => {
        state.userRequest = false;
        state.isAuth = false;
        state.user = null;
        state.isUserChecked = true;
      })
      //изменение данных пользователя
      .addCase(updateUser.pending, (state) => {
        state.userRequest = true;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.userRequest = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state) => {
        state.userRequest = false;
      })
      //выход текущего пользователя
      .addCase(logoutUser.fulfilled, (state) => {
        state.userRequest = false;
        state.user = null;
        state.isAuth = false;
        state.isUserChecked = true;
      });
  }
});
