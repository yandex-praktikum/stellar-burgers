import {
  TLoginData,
  TRegisterData,
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { setCookie } from '../../../src/utils/cookie';
import { log } from 'console';
import { LoggedIn } from 'src/stories/Header.stories';

const initialState: {
  email: TUser['email'];
  name: TUser['name'];
  isLoading: boolean;
  isError: boolean;
  errorText: string | undefined;
} = {
  email: '',
  name: '',
  isLoading: true,
  isError: false,
  errorText: ''
};

export const fetchUserRegister = createAsyncThunk(
  'user/register',
  async (registerData: TRegisterData) => await registerUserApi(registerData)
);

export const fetchUserLogout = createAsyncThunk(
  'user/logout',
  async () => await logoutApi()
);

export const fetchUserLogin = createAsyncThunk(
  'user/login',
  async (loginData: TLoginData) => await loginUserApi(loginData)
);

export const fetchRecoverPassword = createAsyncThunk(
  'user/recoverPassword',
  async (data: { email: string }) => await forgotPasswordApi(data)
);

export const fetchGetUser = createAsyncThunk(
  'user/getUser',
  async () => await getUserApi()
);

export const fetchUserUpdate = createAsyncThunk(
  'user/updateUser',
  async (updatedData: TRegisterData) => await updateUserApi(updatedData)
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
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
        console.log('fetchUserRegister action: ', JSON.stringify(action));
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(fetchUserLogout.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchUserLogout.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.errorText = action?.payload?.error.message;
      })
      .addCase(fetchUserLogout.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.name = '';
        state.email = '';
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
        setCookie('acccessToken', action.payload.accessToken);
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
        console.log('fetchGetUser action: ', JSON.stringify(action));
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
        console.log('user update action: ', JSON.stringify(action));
      })
      .addCase(fetchUserUpdate.rejected, (state, action) => {
        state.isError = true;
        state.errorText = action.error.message;
        state.isLoading = true;
      })
      .addCase(fetchUserUpdate.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.email = action.payload.user.email;
        state.name = action.payload.user.name;
      });
  }
});

export default userSlice.reducer;
