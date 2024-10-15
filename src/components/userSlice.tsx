import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  TRegisterData,
  TLoginData
} from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../utils/cookie';

export const apiGetUser = createAsyncThunk('user/getUser', getUserApi);
export const updateUser = createAsyncThunk('user/update', updateUserApi);
export const register = createAsyncThunk(
  'user/register',
  async (userData: TRegisterData) => {
    const data = await registerUserApi(userData);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);
export const login = createAsyncThunk(
  'user/login',
  async (userData: TLoginData) => {
    const data = await loginUserApi(userData);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);
export const logout = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

export interface TUserState {
  isAuthChecked: boolean;
  user: TUser;
  error: string | undefined;
}

const initialState: TUserState = {
  isAuthChecked: false,
  user: {
    email: '',
    name: ''
  },
  error: undefined
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
        state.error = undefined;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.error.message || 'Registration failed';
      })
      .addCase(register.pending, (state) => {
        state.error = undefined;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
        state.error = undefined;
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error.message || 'Login failed';
      })
      .addCase(login.pending, (state) => {
        state.isAuthChecked = false;
        state.error = undefined;
      })
      .addCase(apiGetUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
      })
      .addCase(apiGetUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error.message || 'Failed to fetch user';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error.message || 'Update failed';
      })
      .addCase(updateUser.pending, (state) => {
        state.error = undefined;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthChecked = false;
        state.user = { email: '', name: '' };
      });
  }
});

export const isAuthCheckedSelector = (state: { user: TUserState }) =>
  state.user.isAuthChecked;
export const getUserSelector = (state: { user: TUserState }) => state.user.user;
export const getUserNameSelector = (state: { user: TUserState }) =>
  state.user.user.name;
export const getErrorSelector = (state: { user: TUserState }) =>
  state.user.error;

export default userSlice;
