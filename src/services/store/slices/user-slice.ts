import {
  getUserApi,
  handleApiError,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IApiError, IUserState } from '@utils-types';
import { setCookie, deleteCookie } from '@utils-cookie';
import { RootState } from '@store';

// Переменные для строковых наименований
const registerUserActionType = 'user/registerUser';
const loginUserActionType = 'user/loginUser';
const fetchUserActionType = 'user/fetchUser';
const updateUserActionType = 'user/updateUser';
const logoutUserActionType = 'user/logoutUser';
const userSliceName = 'user';
const accessTokenName = 'accessToken';
const refreshTokenName = 'refreshToken';

// Начальное состояние
const initialState: IUserState = {
  isChecked: false,
  isLoading: false,
  user: null,
  error: null
};

// Регистрация пользователя
export const registerUser = createAsyncThunk(
  registerUserActionType,
  async (data: TRegisterData, { rejectWithValue }) => {
    try {
      const response = await registerUserApi(data);
      const { user, accessToken, refreshToken } = response;
      setCookie(accessTokenName, accessToken);
      localStorage.setItem(refreshTokenName, refreshToken);
      return user;
    } catch (error) {
      return rejectWithValue(handleApiError(error, 'Failed to register user'));
    }
  }
);

// Авторизация пользователя
export const loginUser = createAsyncThunk(
  loginUserActionType,
  async (data: TLoginData, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(data);
      const { user, accessToken, refreshToken } = response;
      setCookie(accessTokenName, accessToken);
      localStorage.setItem(refreshTokenName, refreshToken);
      return user;
    } catch (error) {
      return rejectWithValue(handleApiError(error, 'Failed to login user'));
    }
  }
);

// Получение текущего пользователя
export const fetchUser = createAsyncThunk(
  fetchUserActionType,
  async (_, { rejectWithValue }) => {
    try {
      return (await getUserApi()).user;
    } catch (error) {
      return rejectWithValue(handleApiError(error, 'Failed to fetch user'));
    }
  }
);

// Обновление данных пользователя
export const updateUser = createAsyncThunk(
  updateUserActionType,
  async (data: Partial<TRegisterData>, { rejectWithValue }) => {
    try {
      return (await updateUserApi(data)).user;
    } catch (error) {
      return rejectWithValue(handleApiError(error, 'Failed to update user'));
    }
  }
);

// Выход из системы
export const logoutUser = createAsyncThunk(
  logoutUserActionType,
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      deleteCookie(accessTokenName);
      localStorage.removeItem(refreshTokenName);
    } catch (error) {
      const errorResponse = error as IApiError;
      return rejectWithValue('Failed to logout user: ' + errorResponse.message);
    }
  }
);

// Слайс для пользователя
const userSlice = createSlice({
  name: userSliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Регистрация
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Авторизация
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isChecked = false;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isChecked = true;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isChecked = true;
        state.error = action.payload as string;
      })
      // Получение текущего пользователя
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.isChecked = false;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isChecked = true;
        state.isLoading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isChecked = true;
        state.error = action.payload as string;
      })
      // Обновление данных пользователя
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.isChecked = false;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isChecked = true;
        state.isLoading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isChecked = true;
        state.error = action.payload as string;
      })
      // Выход из системы
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.isChecked = false;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.user = null;
        state.isChecked = true;
        state.isLoading = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isChecked = true;
        state.error = action.payload as string;
      });
  }
});

// Селекторы
export const selectUser = (state: RootState) => state.userState.user;
export const selectUserLoadingState = (state: RootState) =>
  state.userState.isLoading;
export const selectUserCheckedState = (state: RootState) =>
  state.userState.isChecked;
export const selectUserError = (state: RootState) => state.userState.error;

export default userSlice.reducer;
