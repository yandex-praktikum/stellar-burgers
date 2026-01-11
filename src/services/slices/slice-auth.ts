import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  TLoginData,
  TRegisterData,
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  updateUserApi
} from '@api';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

type AuthState = {
  user: TUser | null;
  isAuthChecked: boolean;
  isLoading: boolean;
  error: string | null;
  forgotPasswordSuccess: boolean;
  resetPasswordSuccess: boolean;
};

type TAuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: TUser;
  success: boolean;
};

type TServerError = {
  message?: string;
};

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

const initialState: AuthState = {
  user: null,
  isAuthChecked: false,
  isLoading: false,
  error: null,
  forgotPasswordSuccess: false,
  resetPasswordSuccess: false
};

const saveTokens = (data: TAuthResponse) => {
  setCookie(ACCESS_TOKEN_KEY, data.accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
};

const clearTokens = () => {
  deleteCookie(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

const getErrorMessage = (err: unknown): string | null => {
  if (typeof err === 'object' && err !== null && 'message' in err) {
    const message = (err as TServerError).message;
    return typeof message === 'string' ? message : null;
  }
  return null;
};

export const registerUser = createAsyncThunk<
  TAuthResponse,
  TRegisterData,
  { rejectValue: string | null }
>('auth/register', async (data, { rejectWithValue }) => {
  try {
    return await registerUserApi(data);
  } catch (err) {
    return rejectWithValue(getErrorMessage(err));
  }
});

export const loginUser = createAsyncThunk<
  TAuthResponse,
  TLoginData,
  { rejectValue: string | null }
>('auth/login', async (data, { rejectWithValue }) => {
  try {
    return await loginUserApi(data);
  } catch (err) {
    return rejectWithValue(getErrorMessage(err));
  }
});

export const logoutUser = createAsyncThunk<
  void,
  void,
  { rejectValue: string | null }
>('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await logoutApi();
  } catch (err) {
    return rejectWithValue(getErrorMessage(err));
  }
});

export const fetchUser = createAsyncThunk<
  { user: TUser },
  void,
  { rejectValue: string | null }
>('auth/getUser', async (_, { rejectWithValue }) => {
  try {
    return await getUserApi();
  } catch (err) {
    return rejectWithValue(getErrorMessage(err));
  }
});

export const updateUser = createAsyncThunk<
  { user: TUser },
  Partial<TRegisterData>,
  { rejectValue: string | null }
>('auth/updateUser', async (data, { rejectWithValue }) => {
  try {
    return await updateUserApi(data);
  } catch (err) {
    return rejectWithValue(getErrorMessage(err));
  }
});

export const forgotPassword = createAsyncThunk<
  { success: boolean },
  { email: string },
  { rejectValue: string | null }
>('auth/forgotPassword', async (data, { rejectWithValue }) => {
  try {
    return await forgotPasswordApi(data);
  } catch (err) {
    return rejectWithValue(getErrorMessage(err));
  }
});

export const resetPassword = createAsyncThunk<
  { success: boolean },
  { password: string; token: string },
  { rejectValue: string | null }
>('auth/resetPassword', async (data, { rejectWithValue }) => {
  try {
    return await resetPasswordApi(data);
  } catch (err) {
    return rejectWithValue(getErrorMessage(err));
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
    resetForgotPasswordState: (state) => {
      state.forgotPasswordSuccess = false;
    },
    resetResetPasswordState: (state) => {
      state.resetPasswordSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthChecked = true;
        saveTokens(action.payload);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || null;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthChecked = true;
        saveTokens(action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || null;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthChecked = true;
        clearTokens();
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || null;
      })
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthChecked = true;
        state.error = null;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || null;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.forgotPasswordSuccess = action.payload.success;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || null;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.resetPasswordSuccess = action.payload.success;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || null;
      });
  }
});

export const {
  clearAuthError,
  resetForgotPasswordState,
  resetResetPasswordState
} = authSlice.actions;

export const authReducer = authSlice.reducer;
