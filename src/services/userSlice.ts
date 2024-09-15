import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TUser, TOrder } from '../utils/types';
import {
  getUserApi,
  registerUserApi,
  TRegisterData,
  loginUserApi,
  TLoginData,
  logoutApi,
  updateUserApi,
  getOrdersApi
} from '../utils/burger-api';
import { setCookie, getCookie, deleteCookie } from '../utils/cookie';

type TUserState = {
  isAuthChecked: boolean;
  error: string;
  request: boolean;
  success: boolean;
  user: TUser | null;
  userOrders: TOrder[];
};

const initialState: TUserState = {
  isAuthChecked: false,
  error: '',
  request: false,
  success: false,
  user: null,
  userOrders: []
};

export const getUser = createAsyncThunk(
  'user/getUser',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      getUserApi()
        .then((res) => {
          dispatch(setUser(res.user));
        })
        .catch((err) => console.log(err))
        .finally(() => {
          dispatch(setIsAuthChecked(true));
        });
    } else {
      dispatch(setIsAuthChecked(true));
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData) => await registerUserApi(data)
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(data);
      setCookie('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.message || 'Не удалось авторизоваться');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { dispatch }) => {
    logoutApi()
      .then(() => {
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
        dispatch(setUser(null));
      })
      .catch((err) => console.log(err));
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: TRegisterData) => await updateUserApi(data)
);

export const getUserOrders = createAsyncThunk(
  'user/userOrders',
  async () => await getOrdersApi()
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    resetError: (state) => {
      state.error = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.success = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.success = false;
        state.isAuthChecked = true;
        state.error = action.error.message as string;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.success = action.payload.success;
        state.isAuthChecked = true;
        state.error = action.payload.success
          ? ''
          : 'Не удалось зарегестрироваться.';
      })
      .addCase(loginUser.pending, (state) => {
        state.success = false;
        state.error = '';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.success = false;
        state.isAuthChecked = true;
        state.error = action.payload as string;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.success = action.payload.success;
        state.isAuthChecked = true;
        state.error = action.payload.success
          ? ''
          : 'Не удалось авторизоваться.';
      })
      .addCase(getUser.pending, (state) => {
        state.success = false;
        state.isAuthChecked = false;
      })
      .addCase(getUser.rejected, (state) => {
        state.user = null;
        state.success = false;
      })
      .addCase(getUser.fulfilled, (state) => {
        state.error = '';
      })
      .addCase(updateUser.rejected, (state) => {
        state.error = 'Не удалось обновить данные.';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.error = action.payload.success
          ? ''
          : 'Не удалось обновить данные.';
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.userOrders = [];
        state.request = false;
      })
      .addCase(getUserOrders.pending, (state) => {
        state.request = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.userOrders = action.payload;
        state.request = false;
        state.error = '';
      });
  }
});

export const { resetError, setUser, setIsAuthChecked, clearUser } =
  userSlice.actions;
