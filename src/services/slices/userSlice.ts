import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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
import { deleteCookie, setCookie } from '../../utils/cookie';

export interface UserState {
  user: TUser | null;
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  loginRequest: boolean;
  loginError: string | null;
  registerRequest: boolean;
  registerError: string | null;
}

const initialState: UserState = {
  user: null,
  isAuthChecked: false,
  isAuthenticated: false,
  loginRequest: false,
  loginError: null,
  registerRequest: false,
  registerError: null
};

// Thunk для проверки авторизации пользователя
export const checkUserAuth = createAsyncThunk(
  'user/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getUserApi();
      return data.user;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Ошибка проверки авторизации'
      );
    }
  }
);

// Thunk для регистрации пользователя
export const registerUser = createAsyncThunk(
  'user/register',
  async (userData: TRegisterData, { rejectWithValue }) => {
    try {
      const data = await registerUserApi(userData);
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data.user;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Ошибка регистрации'
      );
    }
  }
);

// Thunk для авторизации пользователя
export const loginUser = createAsyncThunk(
  'user/login',
  async (loginData: TLoginData, { rejectWithValue }) => {
    try {
      const data = await loginUserApi(loginData);
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data.user;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Ошибка входа'
      );
    }
  }
);

// Thunk для обновления данных пользователя
export const updateUser = createAsyncThunk(
  'user/update',
  async (userData: Partial<TRegisterData>, { rejectWithValue }) => {
    try {
      const data = await updateUserApi(userData);
      return data.user;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Ошибка обновления данных'
      );
    }
  }
);

// Thunk для выхода пользователя
export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Ошибка выхода'
      );
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Редюсер для очистки ошибок
    clearErrors: (state) => {
      state.loginError = null;
      state.registerError = null;
    }
  },
  extraReducers: (builder) => {
    // checkUserAuth
    builder
      .addCase(checkUserAuth.pending, (state) => {
        state.isAuthChecked = false;
      })
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(checkUserAuth.rejected, (state) => {
        state.isAuthChecked = true;
        state.isAuthenticated = false;
      });

    // registerUser
    builder
      .addCase(registerUser.pending, (state) => {
        state.registerRequest = true;
        state.registerError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.registerRequest = false;
        state.registerError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerRequest = false;
        state.registerError = action.payload as string;
      });

    // loginUser
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginRequest = true;
        state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loginRequest = false;
        state.loginError = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginRequest = false;
        state.loginError = action.payload as string;
      });

    // updateUser
    builder
      .addCase(updateUser.pending, (state) => {
        state.loginRequest = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loginRequest = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loginRequest = false;
        state.loginError = action.payload as string;
      });

    // logoutUser
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loginRequest = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loginRequest = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.loginRequest = false;
      });
  }
});

export const { clearErrors } = userSlice.actions;
export default userSlice.reducer;
