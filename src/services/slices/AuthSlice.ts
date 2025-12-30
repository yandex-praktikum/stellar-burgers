import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  TRegisterData,
  TLoginData
} from '@api';
import { TUser } from '@utils-types';
import { setCookie, deleteCookie, getCookie } from '../../utils/cookie';

export type TAuthState = {
  user: TUser | null;
  isAuthenticated: boolean;
  isAuthChecked: boolean;
  loading: boolean;
  error: string | null;
  loginRequest: boolean;
  registerRequest: boolean;
  logoutRequest: boolean;
  updateRequest: boolean;
};

export const registerUser = createAsyncThunk<
  TUser,
  TRegisterData,
  { rejectValue: string }
>('auth/registerUser', async (userData, thunkAPI) => {
  try {
    const response = await registerUserApi(userData);
    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken, { expires: 1200 });
    return response.user;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message || 'Registration failed');
  }
});

export const loginUser = createAsyncThunk<
  TUser,
  TLoginData,
  { rejectValue: string }
>('auth/loginUser', async (loginData, thunkAPI) => {
  try {
    const response = await loginUserApi(loginData);
    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken, { expires: 1200 });
    return response.user;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message || 'Login failed');
  }
});

export const getUser = createAsyncThunk<TUser, void, { rejectValue: string }>(
  'auth/getUser',
  async (_, thunkAPI) => {
    try {
      const response = await getUserApi();
      return response.user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to get user');
    }
  }
);

export const updateUser = createAsyncThunk<
  TUser,
  Partial<TRegisterData>,
  { rejectValue: string }
>('auth/updateUser', async (userData, thunkAPI) => {
  try {
    const response = await updateUserApi(userData);
    return response.user;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message || 'Failed to update user');
  }
});

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await logoutApi();
      localStorage.clear();
      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');
    } catch (error: any) {
      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const authInitialState: TAuthState = {
  user: null,
  isAuthenticated: false,
  isAuthChecked: false,
  loading: false,
  error: null,
  loginRequest: false,
  registerRequest: false,
  logoutRequest: false,
  updateRequest: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    checkAuth: (state) => {
      const refreshToken = localStorage.getItem('refreshToken');
      const accessToken = getCookie('accessToken');
      state.isAuthenticated = !!(refreshToken && accessToken);
    },
    clearAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isAuthChecked = true;
      state.error = null;
      state.loading = false;
      state.loginRequest = false;
      state.registerRequest = false;
      state.logoutRequest = false;
      state.updateRequest = false;
      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.registerRequest = true;
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerRequest = false;
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerRequest = false;
        state.loading = false;
        state.error = action.payload || 'Registration failed';
        state.isAuthenticated = false;
        state.isAuthChecked = true;
      })

      .addCase(loginUser.pending, (state) => {
        state.loginRequest = true;
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginRequest = false;
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginRequest = false;
        state.loading = false;
        state.error = action.payload || 'Login failed';
        state.isAuthenticated = false;
        state.isAuthChecked = true;
      })

      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to get user';
        state.user = null;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
        localStorage.removeItem('refreshToken');
        deleteCookie('accessToken');
      })

      .addCase(updateUser.pending, (state) => {
        state.updateRequest = true;
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updateRequest = false;
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateRequest = false;
        state.loading = false;
        state.error = action.payload || 'Failed to update user';
      })

      .addCase(logoutUser.pending, (state) => {
        state.logoutRequest = true;
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.logoutRequest = false;
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.logoutRequest = false;
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
        state.error = null;
      });
  }
});

export const { clearError, checkAuth, clearAuth } = authSlice.actions;

export const authReducer = authSlice.reducer;

export const selectAuth = (state: { auth: TAuthState }) => state.auth;
export const selectUser = (state: { auth: TAuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: TAuthState }) =>
  state.auth.isAuthenticated;
export const selectIsAuthChecked = (state: { auth: TAuthState }) =>
  state.auth.isAuthChecked;
export const selectAuthLoading = (state: { auth: TAuthState }) =>
  state.auth.loading;
export const selectAuthError = (state: { auth: TAuthState }) =>
  state.auth.error;
