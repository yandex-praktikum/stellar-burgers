import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TUser, TRegisterData } from '@utils-types';
import {
  getUserApi,
  updateUserApi,
  TLoginData,
  loginUserApi,
  logoutApi,
  registerUserApi
} from '../../utils/burger-api';
import { setCookie, deleteCookie, getCookie } from '../../utils/cookie';

// Определение типа для состояния профиля пользователя
type TProfileState = {
  user: TUser | null;
  isAuthChecked: boolean;
  error: string | null;
  isLoading: boolean;
  isUpdating: boolean;
};

// Начальное состояние
export const initialState: TProfileState = {
  user: null,
  isAuthChecked: false,
  error: null,
  isLoading: false,
  isUpdating: false
};

// Общая функция для обработки ошибок в асинхронных действиях
const handleError = (state: TProfileState, action: any, message: string) => {
  state.isLoading = false;
  state.isUpdating = false;
  state.error = action.error?.message || message;
};

// Общая функция для обработки начала асинхронного действия
const startLoading = (state: TProfileState) => {
  state.isLoading = true;
  state.error = null;
};

// Асинхронный thunk для получения данных пользователя
export const fetchUserProfile = createAsyncThunk('profile/getUser', async () =>
  getUserApi().then((res) => res.user)
);

// Асинхронный thunk для обновления данных пользователя
export const updateUserProfile = createAsyncThunk(
  'profile/updateUser',
  async (user: Partial<TRegisterData>) => (await updateUserApi(user)).user
);

// Асинхронный thunk для регистрации пользователя
export const userRegister = createAsyncThunk(
  'profile/register',
  async ({ email, name, password }: TRegisterData) => {
    const res = await registerUserApi({ email, name, password });
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

// Асинхронный thunk для входа пользователя
export const userLogin = createAsyncThunk(
  'profile/login',
  async ({ email, password }: TLoginData) => {
    const res = await loginUserApi({ email, password });
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

// Асинхронный thunk для выхода пользователя
export const userLogout = createAsyncThunk('profile/logout', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

// Создание слайса
export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    // Устанавливаем флаг проверки авторизации
    authChecked: (state) => {
      state.isAuthChecked = true;
    },
    // Сброс ошибки
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // Обработка получения профиля пользователя
    builder.addCase(fetchUserProfile.pending, (state) => startLoading(state));
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.isAuthChecked = true;
    });
    builder.addCase(fetchUserProfile.rejected, (state, action) =>
      handleError(state, action, 'Не удалось загрузить профиль')
    );

    // Обработка обновления профиля
    builder.addCase(updateUserProfile.pending, (state) => {
      state.isUpdating = true;
      state.error = null;
    });
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isUpdating = false;
    });
    builder.addCase(updateUserProfile.rejected, (state, action) =>
      handleError(state, action, 'Не удалось обновить профиль')
    );

    // Обработка регистрации
    builder.addCase(userRegister.pending, (state) => startLoading(state));
    builder.addCase(userRegister.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    });
    builder.addCase(userRegister.rejected, (state, action) =>
      handleError(state, action, 'Регистрация не удалась')
    );

    // Обработка входа
    builder.addCase(userLogin.pending, (state) => startLoading(state));
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.isAuthChecked = true;
    });
    builder.addCase(userLogin.rejected, (state, action) =>
      handleError(state, action, 'Вход не удался')
    );

    // Обработка выхода
    builder.addCase(userLogout.fulfilled, (state) => {
      state.user = null;
      state.isAuthChecked = false;
    });
  }
});

// Экспортируем actions для использования в компонентах
export const { authChecked, clearError } = profileSlice.actions;

// Экспортируем селекторы для доступа к данным из слайса
export const selectUser = (state: TProfileState) => state.user;
export const selectIsLoading = (state: TProfileState) => state.isLoading;
export const selectIsUpdating = (state: TProfileState) => state.isUpdating;
export const selectIsAuthChecked = (state: TProfileState) =>
  state.isAuthChecked;
export const selectError = (state: TProfileState) => state.error;

export default profileSlice.reducer;
