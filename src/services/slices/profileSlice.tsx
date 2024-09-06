import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TUser, TRegisterData } from '@utils-types';
import {
  getUserApi,
  updateUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData
} from '../../utils/burger-api';
import { setCookie, deleteCookie, getCookie } from '../../utils/cookie';

// Определение типа для состояния профиля пользователя
type TProfileState = {
  user: TUser | null;
  isAuthChecked: boolean;
  error: string | null;
  isLoading: boolean;
};

// Начальное состояние
const initialState: TProfileState = {
  user: null,
  isAuthChecked: false,
  error: null,
  isLoading: false
};

// Общая функция для обработки состояния загрузки и ошибок
const handlePending = (state: TProfileState) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (
  state: TProfileState,
  action: PayloadAction<string | undefined>
) => {
  state.isLoading = false;
  state.error = action.payload || 'Ошибка выполнения';
};

// Создание асинхронных действий
export const getUser = createAsyncThunk('user/get', async () => getUserApi());

export const checkUser = createAsyncThunk(
  'user/check',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      await dispatch(getUser());
    }
    dispatch(authChecked());
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (user: Partial<TRegisterData>, { rejectWithValue }) => {
    try {
      const updatedUser = await updateUserApi(user);
      return updatedUser; // Возвращаем обновленные данные пользователя
    } catch (error) {
      return rejectWithValue('Обновление пользователя не удалось'); // Возвращаем сообщение об ошибке
    }
  }
);

export const userRegister = createAsyncThunk(
  'user/register',
  async ({ email, name, password }: TRegisterData, { rejectWithValue }) => {
    const data = await registerUserApi({ email, name, password });
    if (!data?.success) {
      return rejectWithValue('Регистрация не удалась');
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const userLogin = createAsyncThunk(
  'user/login',
  async ({ email, password }: TLoginData, { rejectWithValue }) => {
    const data = await loginUserApi({ email, password });
    if (!data?.success) {
      return rejectWithValue('Вход не удался');
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const userLogout = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.clear();
});

// Создание среза
export const profileSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, handlePending)
      .addCase(
        getUser.fulfilled,
        (state, action: PayloadAction<{ user: TUser }>) => {
          state.user = action.payload.user;
          state.isLoading = false;
          state.isAuthChecked = true;
        }
      )
      .addCase(checkUser.pending, handlePending)
      .addCase(checkUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthChecked = false;
        state.error = 'Пользователь не зарегистрирован';
      })
      .addCase(checkUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthChecked = true;
      })
      .addCase(updateUser.pending, handlePending)
      .addCase(
        updateUser.fulfilled,
        (state, action: PayloadAction<{ user: TUser }>) => {
          state.isLoading = false;
          state.user = action.payload.user; // здесь должно возвращаться соответствующее значение
        }
      )
      .addCase(userRegister.pending, handlePending)
      .addCase(
        userRegister.fulfilled,
        (state, action: PayloadAction<{ user: TUser }>) => {
          state.isLoading = false;
          state.user = action.payload.user;
        }
      )
      .addCase(userLogin.pending, handlePending)
      .addCase(userLogin.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.user = action.payload;
      })
      .addCase(userLogout.pending, handlePending)
      .addCase(userLogout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      });
  }
});

// Экспорт действий и редюсера
export const { authChecked } = profileSlice.actions;
export default profileSlice.reducer;

// Селектор для получения пользователя
export const selectUser = (state: { user: TProfileState }) => state.user;
