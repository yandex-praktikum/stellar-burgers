import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginUserApi,
  registerUserApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  type TRegisterData,
  type TLoginData,
  type TAuthResponse,
  type TUserResponse
} from '@api';
import { TUser } from '@utils-types';
import { RootState } from '../store';
import { setCookie } from '../../utils/cookie';

//логин
export const loginUser = createAsyncThunk<
  {
    user: TUser;
    accessToken: string;
  },
  TLoginData,
  { state: RootState }
>('user/loginUser', async (loginData, { rejectWithValue }) => {
  try {
    const response: TAuthResponse = await loginUserApi(loginData);
    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);
    return {
      user: response.user,
      accessToken: response.accessToken
    };
  } catch (error) {
    return rejectWithValue('ошибка на сервере');
  }
});

//регистрация
export const registerUser = createAsyncThunk<
  {
    user: TUser;
    accessToken: string;
  },
  TRegisterData,
  { state: RootState }
>('user/registerUser', async (registerData, { rejectWithValue }) => {
  try {
    const response: TAuthResponse = await registerUserApi(registerData);
    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);
    return {
      user: response.user,
      accessToken: response.accessToken
    };
  } catch (error) {
    return rejectWithValue('ошибка сервера при регистрации' as const);
  }
});

export const getUser = createAsyncThunk<TUser, void, { state: RootState }>(
  'user/getUser',
  async (_, { rejectWithValue }) => {
    try {
      const response: TUserResponse = await getUserApi();
      return response.user;
    } catch (error) {
      return rejectWithValue('ошибка сервера при авторизации' as const);
    }
  }
);

export const updateUser = createAsyncThunk<
  TUser,
  Partial<TRegisterData>,
  { state: RootState }
>('user/updateUser', async (userData, { rejectWithValue }) => {
  try {
    const response: TUserResponse = await updateUserApi(userData);
    return response.user;
  } catch (error) {
    return rejectWithValue(
      'ошибка на сервере при сохранении изменений профиля' as const
    );
  }
});

export const logoutUser = createAsyncThunk<void, void, { state: RootState }>(
  'user/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      localStorage.removeItem('refreshToken');
      setCookie('accessToken', '', { expires: new Date(0) });
    } catch (error) {
      localStorage.removeItem('refreshToken');
      setCookie('accessToken', '', { expires: new Date(0) });
      return rejectWithValue('ошибка на сервере при попытке выхода');
    }
  }
);
