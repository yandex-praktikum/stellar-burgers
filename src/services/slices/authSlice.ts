import {
  createSlice,
  createAsyncThunk,
  SerializedError
} from '@reduxjs/toolkit';
import {
  loginUserApi,
  getUserApi,
  logoutApi,
  registerUserApi,
  TRegisterData,
  updateUserApi
} from '@api';
import { TLoginData } from '@api';
import { TUser } from '@utils-types';
import { setCookie } from '../../utils/cookie';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  errorRegister: null | SerializedError;
  userData: TUser | null;
  authChecked: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  refreshToken: null,
  isLoading: false,
  errorRegister: null,
  userData: null,
  authChecked: false
};

// Асинхронный thunk для входа
export const login = createAsyncThunk(
  'user/login',
  async (userData: TLoginData) => {
    const { email, password } = userData;
    const data = await loginUserApi({ email, password });
    if (data?.success) {
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
    }

    return data;
  }
);
// Асинхронный thunk для выхода
export const logout = createAsyncThunk(
  'auth/login',
  async () => await logoutApi()
);

// Асинхронный thunk для проверки пользователя
export const getUser = createAsyncThunk(
  'auth/get-user',
  async () => await getUserApi()
);

// Асинхронный thunk для регистрации
export const register = createAsyncThunk(
  'auth/register',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    if (response?.success) {
      setCookie('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
    }

    return response;
  }
);

// Обновление
export const updateUser = createAsyncThunk<TUser, Partial<TRegisterData>>(
  'user/update',
  async (data, { rejectWithValue }) => {
    const response = await updateUserApi(data);
    if (!response?.success) {
      return rejectWithValue(response);
    }
    return response.user;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.refreshToken = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.errorRegister = null;
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.userData = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.errorRegister = action.error;
      })
      .addCase(getUser.pending, (state) => {
        state.authChecked = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.authChecked = true;
        state.userData = action.payload.user;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.authChecked = true;
      })
      .addCase(register.pending, (state) => {
        state.errorRegister = null;
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.userData = action.payload.user;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.errorRegister = action.error;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userData = action.payload;
      });
  }
});

export default authSlice.reducer;
