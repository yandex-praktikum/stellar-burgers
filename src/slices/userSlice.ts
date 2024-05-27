import {
  TLoginData,
  TRegisterData,
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setCookie } from '../../src/utils/cookie';
import { RootState } from '../../src/services/store';
import { TOrder, TUser } from '@utils-types';
import { deleteCookie } from '../utils/cookie';
import { stat } from 'fs';

type TUserState = {
  data: TUser | null;
  registerUserRequest: boolean;
  registerUserError: null | string;
  loginUserRequest: boolean;
  loginUserError: null | string;
  isAuthenticated: boolean;
  userOrders: TOrder[];
  userOrdersError: null | string;
  userOrdersLoading: boolean;
  updateUserRequest: boolean;
  updateUserErrors: null | string;
  logoutRequest: boolean;
  logoutError: null | string;
};

const initialState: TUserState = {
  data: {
    email: '',
    name: ''
  },
  registerUserRequest: false,
  registerUserError: null,
  loginUserRequest: false,
  loginUserError: null,
  isAuthenticated: false,
  userOrders: [],
  userOrdersError: null,
  userOrdersLoading: false,
  updateUserRequest: false,
  updateUserErrors: null,
  logoutRequest: false,
  logoutError: null
};

export const getUserOrders = createAsyncThunk(
  'user/getUserOrders',
  async () => {
    const orders = await getOrdersApi();
    return orders;
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }: TRegisterData) => {
    const data = await registerUserApi({ name, email, password });
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('user', JSON.stringify(data.user));
    setCookie('accessToken', data.accessToken);
    return data.user;
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }: TLoginData) => {
    const data = await loginUserApi({ email, password });
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('user', JSON.stringify(data.user));
    setCookie('accessToken', data.accessToken);
    return data.user;
  }
);

export const getUser = createAsyncThunk('user/auth', async () => {
  const user = await getUserApi();
  return user;
});

export const updateUser = createAsyncThunk(
  'user/update',
  async (user: TUser) => {
    const data = await updateUserApi(user);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  }
);

export const logout = createAsyncThunk('user/logout', async () => {
  const data = await logoutApi();
  localStorage.removeItem('user');
  deleteCookie('accessToken');
  return data;
});

export const selectIsAuthenticated = (state: RootState) =>
  state.user.isAuthenticated;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
      state.isAuthenticated = true;
    },
    setOrders: (state, action) => {
      state.userOrders = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.registerUserRequest = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.registerUserRequest = false;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state) => {
        state.registerUserRequest = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loginUserRequest = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError = action.error.message as string;
      })
      .addCase(getUser.pending, (state) => {
        state.isAuthenticated = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(getUser.rejected, (state) => {
        state.isAuthenticated = false;
      })
      .addCase(getUserOrders.pending, (state) => {
        state.userOrdersLoading = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.userOrdersLoading = false;
        state.userOrders = action.payload;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.userOrdersLoading = false;
        state.userOrdersError = action.error.message as string;
      })
      .addCase(updateUser.pending, (state) => {
        state.updateUserRequest = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.updateUserRequest = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateUserRequest = false;
        state.updateUserErrors = action.error.message as string;
      })
      .addCase(logout.pending, (state) => {
        state.logoutRequest = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.data = null;
        state.isAuthenticated = false;
        state.logoutRequest = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.logoutRequest = false;
        state.logoutError = action.error.message as string;
      });
  }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
