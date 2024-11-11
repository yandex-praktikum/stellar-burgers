import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  forgotPasswordApi,
  resetPasswordApi,
  TRegisterData,
  TLoginData
} from '@api';

// Типы для состояния и запросов
type UserState = {
  user: TUser | null;
  isLoading: boolean;
  error: string | null;
  isAuthorized: boolean;
};

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthorized: false
};

// Thunks для асинхронных операций

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData, { rejectWithValue }) => {
    try {
      const response = await registerUserApi(data);
      return response.user;
    } catch (err) {
      return rejectWithValue('Failed to register user');
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(data);
      return response.user;
    } catch (err) {
      return rejectWithValue('Failed to log in user');
    }
  }
);

export const getUser = createAsyncThunk(
  'user/getUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserApi();
      return response.user;
    } catch (err) {
      return rejectWithValue('Failed to get user data');
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: Partial<TRegisterData>, { rejectWithValue }) => {
    try {
      const response = await updateUserApi(data);
      return response.user;
    } catch (err) {
      return rejectWithValue('Failed to update user data');
    }
  }
);

export const logout = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      return null;
    } catch (err) {
      return rejectWithValue('Failed to log out');
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (data: { email: string }, { rejectWithValue }) => {
    try {
      await forgotPasswordApi(data);
    } catch (err) {
      return rejectWithValue('Failed to send password reset email');
    }
  }
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (data: { password: string; token: string }, { rejectWithValue }) => {
    try {
      await resetPasswordApi(data);
    } catch (err) {
      return rejectWithValue('Failed to reset password');
    }
  }
);

// User Slice

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    }
  },
  selectors: {
    selectUser: (state: UserState) => state.user,
    selectIsLoading: (state: UserState) => state.isLoading,
    selectUserError: (state: UserState) => state.error
  },
  extraReducers: (builder) => {
    builder
      // Регистрация
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthorized = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Логин
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthorized = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Получение пользователя
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Обновление данных пользователя
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Логаут
      .addCase(logout.fulfilled, (state) => {
        state = initialState;
      });
  }
});

// Экспорт действий и редьюсера

export const { clearError } = userSlice.actions;
export default userSlice.reducer;
