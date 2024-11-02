import {
  loginUserApi,
  registerUserApi,
  forgotPasswordApi,
  resetPasswordApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  refreshToken,
  TLoginData,
  TRegisterData
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setCookie, getCookie } from '../../utils/cookie';
import { checkUserAuth } from './slice';

export const loginUserThunk = createAsyncThunk(
  'userSlice/loginUserApi',
  async (data: TLoginData, { dispatch, rejectWithValue }) => {
    const response = await loginUserApi(data);
    if (!response.success) {
      return rejectWithValue(null);
    }

    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    dispatch(checkUserAuth());

    return response.user;
  }
);

export const registerUserThunk = createAsyncThunk(
  'userSlice/registerUserApi',
  async (data: TRegisterData, { dispatch, rejectWithValue }) => {
    const response = await registerUserApi(data);

    if (!response.success) {
      return rejectWithValue(null);
    }

    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    dispatch(checkUserAuth());

    return response.user;
  }
);

export const forgotPasswordThunk = createAsyncThunk(
  'userSlice/forgotPasswordApi',
  async (data: { email: string }) => await forgotPasswordApi(data)
);

export const resetPasswordThunk = createAsyncThunk(
  'userSlice/resetPasswordApi',
  async (data: { password: string; token: string }) =>
    await resetPasswordApi(data)
);

export const checkUserAuthThunk = createAsyncThunk(
  'user/checkUser',
  async (_, { dispatch, rejectWithValue }) => {
    if (getCookie('accessToken')) {
      let response = await getUserApi();

      if (!response.success) {
        const refreshResp = await refreshToken();

        if (refreshResp.success) {
          response = await getUserApi();
          return response.success ? response.user : rejectWithValue(null);
        }

        return rejectWithValue(null);
      }

      return response.user;
    }

    dispatch(checkUserAuth());
    return null;
  }
);

export const updateUserThunk = createAsyncThunk(
  'userSlice/updateUserApi',
  async (data: Partial<TRegisterData>) => await updateUserApi(data)
);

export const logoutThunk = createAsyncThunk(
  'userSlice/logoutApi',
  async () => await logoutApi()
);
