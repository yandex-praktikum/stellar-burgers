import {
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

type userState = {
  isUserCheckInProgress: boolean;
  user: TUser | null;
  error: string | null;
};

const initialState: userState = {
  isUserCheckInProgress: false,
  user: null,
  error: null
};

export const fetchRegisterUser = createAsyncThunk(
  'user/fetchRegisterUser',
  async (data: TRegisterData) => registerUserApi(data)
);

export const fetchGetUser = createAsyncThunk('user/fetchGetUser', async () =>
  getUserApi()
);

export const fetchLogoutUser = createAsyncThunk(
  'user/fetchLogoutUser',
  async () => logoutApi()
);

export const fetchLoginUser = createAsyncThunk(
  'user/fetchLoginUser',
  async (data: TLoginData) => loginUserApi(data)
);

export const fetchUpdateUser = createAsyncThunk(
  'user/fetchUpdateUser',
  async (user: Partial<TRegisterData>) => updateUserApi(user)
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegisterUser.pending, (state) => {
        state.isUserCheckInProgress = true;
      })
      .addCase(fetchRegisterUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        state.isUserCheckInProgress = false;
      })
      .addCase(fetchRegisterUser.rejected, (state, action) => {
        state.isUserCheckInProgress = false;
        state.error = action.error.message!;
      })

      .addCase(fetchGetUser.pending, (state) => {
        state.isUserCheckInProgress = true;
      })
      .addCase(fetchGetUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isUserCheckInProgress = false;
      })
      .addCase(fetchGetUser.rejected, (state, action) => {
        state.isUserCheckInProgress = false;
        state.error = action.error.message!;
      })

      .addCase(fetchLogoutUser.pending, (state) => {
        state.isUserCheckInProgress = true;
      })
      .addCase(fetchLogoutUser.fulfilled, (state) => {
        state.user = null;
        state.isUserCheckInProgress = false;
        localStorage.removeItem('refreshToken');
        deleteCookie('accessToken');
      })
      .addCase(fetchLogoutUser.rejected, (state, action) => {
        state.isUserCheckInProgress = false;
        state.error = action.error.message!;
      })

      .addCase(fetchLoginUser.pending, (state) => {
        state.isUserCheckInProgress = true;
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isUserCheckInProgress = false;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(fetchLoginUser.rejected, (state, action) => {
        state.isUserCheckInProgress = false;
        state.error = action.error.message!;
      })

      .addCase(fetchUpdateUser.pending, (state) => {
        state.isUserCheckInProgress = true;
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isUserCheckInProgress = false;
      })
      .addCase(fetchUpdateUser.rejected, (state, action) => {
        state.isUserCheckInProgress = false;
        state.error = action.error.message!;
      });
  }
});

export default userSlice;
