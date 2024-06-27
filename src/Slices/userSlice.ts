import {
  TLoginData,
  TRegisterData,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { AsyncThunk, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '../utils/cookie';

export interface UserState {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  data: TUser | null | undefined;
  loginUserError: string | null;
  loginUserRequest: boolean;
}

const initialState: UserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  isLoading: false,
  data: null,
  loginUserError: null,
  loginUserRequest: false
};

export const getUserThunk = createAsyncThunk('user/getUser', async () =>
  getUserApi()
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(getUserThunk()).finally(() => {
        dispatch(authCheck());
      });
    } else {
      dispatch(authCheck());
    }
  }
);

export const loginUserThunk = createAsyncThunk(
  'user/login',
  async ({ email, password }: TLoginData) => {
    const data = await loginUserApi({ email, password });
    if (!data.success) {
      return;
    } else {
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data.user;
    }
  }
);

export const registerUserThunk = createAsyncThunk(
  'user/registerUser',
  async ({ email, name, password }: TRegisterData) =>
    await registerUserApi({ email, name, password })
);

export const logoutUserThunk = createAsyncThunk(
  'user/logout',
  async () => await logoutApi()
);

export const updateUserDataThunk = createAsyncThunk(
  'user/updateData',
  async ({ email, name, password }: TRegisterData) => {
    const data = await updateUserApi({ email, name, password });
    if (!data.success) {
      return;
    } else {
      return data.user;
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authCheck: (state) => {
      state.isAuthChecked = true;
    }
  },
  selectors: {
    selectUserAuthenticated: (state) => state.isAuthenticated,
    selectUserData: (state) => state.data,
    selectIsAuthChecked: (state) => state.isAuthChecked
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.loginUserRequest = true;
        state.isLoading = true;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loginUserError = 'ОШИБКА ВХОДА';
        state.loginUserRequest = false;
        state.isAuthChecked = true;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.loginUserRequest = false;
        state.isAuthChecked = true;
        state.data = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.loginUserError = 'ОШИБКА';
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.user;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.isLoading = false;
        state.loginUserRequest = false;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
      })
      .addCase(logoutUserThunk.fulfilled, (state, action) => {
        localStorage.clear();
        deleteCookie('accessToken');
        state.data = null;
        state.isAuthenticated = false;
      })
      .addCase(updateUserDataThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserDataThunk.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      });
  }
});

export const userReducer = userSlice.reducer;
export const { selectUserAuthenticated, selectUserData, selectIsAuthChecked } =
  userSlice.selectors;
export const { authCheck } = userSlice.actions;
