import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi
} from '../../utils/burger-api';
import { TUser } from '../../utils/types';

export const registerUser = createAsyncThunk('user/register', registerUserApi);
export const loginUser = createAsyncThunk('user/loginUser', loginUserApi);
export const getUserData = createAsyncThunk('user/getUserData', getUserApi);
export const updateUser = createAsyncThunk('user/updateUser', updateUserApi);
export const logout = createAsyncThunk('user/logout', logoutApi);

type TUserState = {
  isAuthorized: boolean;
  userData: TUser;
  password: string;
  error: string | null | undefined;
};

const initialState: TUserState = {
  isAuthorized: false,
  userData: {
    email: '',
    name: ''
  },
  password: '',
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    getIsAuthorized: (state) => state.isAuthorized,
    getUser: (state) => state.userData,
    getName: (state) => state.userData.name
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthorized = true;
        state.userData = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthorized = true;
        state.userData = action.payload.user;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.isAuthorized = true;
        state.error = action.error.message;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.isAuthorized = false;
        state.userData = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isAuthorized = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.error = '';
        state.userData = action.payload.user;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthorized = false;
        state.userData = {
          email: '',
          name: ''
        };
      });
  }
});

export const { getIsAuthorized, getUser, getName } = userSlice.selectors;

export const userReducer = userSlice.reducer;
