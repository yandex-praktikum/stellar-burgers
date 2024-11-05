import {
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { TUser } from '../../../utils/types';
import {
  registerUserApi,
  loginUserApi,
  updateUserApi,
  logoutApi,
  getUserApi
} from '../../../utils/burger-api';

type TLoadingStatus = 'idle' | 'pending' | 'fulfilled' | 'rejected';

type TUserState = {
  isAuthChecked: boolean;
  user: TUser;
  error: string | null;
  loading: {
    register: TLoadingStatus;
    login: TLoadingStatus;
    getUser: TLoadingStatus;
    update: TLoadingStatus;
    logout: TLoadingStatus;
  };
};

export const initialState: TUserState = {
  isAuthChecked: false,
  user: {
    email: '',
    name: ''
  },
  error: null,
  loading: {
    register: 'idle',
    login: 'idle',
    getUser: 'idle',
    update: 'idle',
    logout: 'idle'
  }
};

const resetError = createAction<string | null>('ERROR_RESET');

const handleError = (
  state: TUserState,
  action: PayloadAction<string | null>
) => {
  state.error = action.payload;
};

export const registerUser = createAsyncThunk('user/register', registerUserApi);
export const loginUser = createAsyncThunk('user/login', loginUserApi);
export const getUserUser = createAsyncThunk('user/getUser', getUserApi);
export const updateUser = createAsyncThunk('user/update', updateUserApi);
export const logoutUser = createAsyncThunk('user/logout', logoutApi);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Регистрация
      .addCase(registerUser.pending, (state) => {
        state.loading.register = 'pending';
        handleError(state, resetError(null));
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading.register = 'fulfilled';
        state.isAuthChecked = true;
        state.user = action.payload.user;
        handleError(state, resetError(null));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading.register = 'rejected';
        handleError(state, resetError(action.error.message || null));
      });

    // Вход
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading.login = 'pending';
        handleError(state, resetError(null));
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading.login = 'fulfilled';
        state.isAuthChecked = true;
        state.user = action.payload.user;
        handleError(state, resetError(null));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading.login = 'rejected';
        handleError(state, resetError(action.error.message || null));
      });

    // Получение информации о пользователе
    builder
      .addCase(getUserUser.pending, (state) => {
        state.loading.getUser = 'pending';
        handleError(state, resetError(null));
      })
      .addCase(getUserUser.fulfilled, (state, action) => {
        state.loading.getUser = 'fulfilled';
        state.isAuthChecked = true;
        state.user = action.payload.user;
        handleError(state, resetError(null));
      })
      .addCase(getUserUser.rejected, (state, action) => {
        state.loading.getUser = 'rejected';
        state.isAuthChecked = false;
        handleError(state, resetError(action.error.message || null));
      });

    // Обновление информации о пользователе
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading.update = 'pending';
        handleError(state, resetError(null));
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading.update = 'fulfilled';
        state.user = action.payload.user;
        handleError(state, resetError(null));
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading.update = 'rejected';
        handleError(state, resetError(action.error.message || null));
      });

    // Выход
    builder.addCase(logoutUser.fulfilled, (state) => (state = initialState));
  }
});

export const getUserError = (state: { user: TUserState }) => state.user.error;
export const getUser = (state: { user: TUserState }) => state.user.user;
export const getUserName = (state: { user: TUserState }) =>
  state.user.user.name;
export const checkUserAuth = (state: { user: TUserState }) =>
  state.user.isAuthChecked;
export const getUserLoadingStatus = (state: { user: TUserState }) =>
  state.user.loading;

const userReducer = userSlice.reducer;
export default userReducer;
