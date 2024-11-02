import { createSlice } from '@reduxjs/toolkit';
import type { TUser } from '@utils-types';
import {
  loginUserThunk,
  registerUserThunk,
  checkUserAuthThunk,
  updateUserThunk,
  logoutThunk
} from './thunk';
import { deleteCookie } from '../../utils/cookie';

export interface IUserSlice {
  isLoading: boolean;
  isAuthChecked: boolean;
  user: TUser | null;
}

const initialState: IUserSlice = {
  user: null,
  isAuthChecked: false,
  isLoading: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    checkUserAuth: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      // loginUserThunk
      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginUserThunk.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      // registerUserThunk
      .addCase(registerUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(registerUserThunk.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      // updateUserThunk
      .addCase(updateUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(updateUserThunk.rejected, (state) => {
        state.isLoading = false;
      })
      // logoutThunk
      .addCase(logoutThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .addCase(logoutThunk.rejected, (state) => {
        state.isLoading = false;
      })
      // checkUserAuthThunk
      .addCase(checkUserAuthThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkUserAuthThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(checkUserAuthThunk.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
      });
  }
});

export const { checkUserAuth } = userSlice.actions;

export default userSlice.reducer;
