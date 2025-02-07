import {
  TLoginData,
  TRegisterData,
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '../../../src/utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../../src/utils/cookie';
import { log } from 'console';
import { LoggedIn } from 'src/stories/Header.stories';

export type TUserState = {
  email: TUser['email'];
  name: TUser['name'];
  isLoading: boolean;
  isError: boolean;
  errorText: string | undefined;
  isRegistered: boolean;
};

export const initialState: TUserState = {
  email: '',
  name: '',
  isLoading: true,
  isError: false,
  errorText: '',
  isRegistered: false
};

export const fetchUserRegister = createAsyncThunk(
  'user/register',
  async (registerData: TRegisterData) => await registerUserApi(registerData)
);

export const fetchUserLogout = createAsyncThunk('user/logout', logoutApi);

export const fetchUserLogin = createAsyncThunk(
  'user/login',
  async (loginData: TLoginData) => await loginUserApi(loginData)
);

export const fetchRecoverPassword = createAsyncThunk(
  'user/recoverPassword',
  async (data: { email: string }) => await forgotPasswordApi(data)
);

export const fetchGetUser = createAsyncThunk('user/getUser', getUserApi);

export const fetchUserUpdate = createAsyncThunk(
  'user/updateUser',
  async (updatedData: TRegisterData) => await updateUserApi(updatedData)
);

const userSlice = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {},
  selectors: {
    selectUser: (state: TUserState) => state,
    selectIsUserRegistered: (state: TUserState) => state.isRegistered
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserRegister.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchUserRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorText = action?.error?.message;
      })
      .addCase(fetchUserRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.email = action.payload.user.email;
        state.name = action.payload.user.name;
        state.isRegistered = true;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(fetchUserLogout.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchUserLogout.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.errorText = action?.error.message;
        state.isRegistered = false;
      })
      .addCase(fetchUserLogout.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.errorText = '';
        state.name = '';
        state.email = '';
        deleteCookie('accessToken');
      })
      .addCase(fetchUserLogin.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchUserLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorText = action.error.message;
      })
      .addCase(fetchUserLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.email = action.payload.user.email;
        state.name = action.payload.user.name;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(fetchGetUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchGetUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorText = action.error.message;
        state.email = '';
        state.name = '';
      })
      .addCase(fetchGetUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.email = action.payload.user.email;
        state.name = action.payload.user.name;
      })
      .addCase(fetchUserUpdate.pending, (state, action) => {
        state.isError = false;
        state.isLoading = true;
        state.email = action.meta.arg.email;
        state.name = action.meta.arg.name;
      })
      .addCase(fetchUserUpdate.rejected, (state, action) => {
        state.isError = true;
        state.errorText = action.error.message;
        state.isLoading = false;
      })
      .addCase(fetchUserUpdate.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.email = action.payload.user.email;
        state.name = action.payload.user.name;
      });
  }
});

export default userSlice;
export const { selectUser, selectIsUserRegistered } = userSlice.selectors;
