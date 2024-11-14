import {
  TRegisterData,
  loginUserApi,
  TLoginData,
  getUserApi,
  TAuthResponse,
  getOrdersApi,
  logoutApi,
  updateUserApi,
  registerUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteCookie, setCookie } from '../../utils/cookie';
import { TOrder, TUser } from '@utils-types';

type TUserState = {
  request: boolean;
  error: string | null;
  response: TAuthResponse | null;
  registerData: TRegisterData | null;
  userData: TUser | null;
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  loginUserRequest: boolean;
  userOrders: TOrder[];
};

const initialState: TUserState = {
  request: false,
  error: null,
  response: null,
  registerData: null,
  userData: null,
  isAuthChecked: false,
  isAuthenticated: false,
  loginUserRequest: false,
  userOrders: []
};

export const registerUser = createAsyncThunk(
  'user/regUser',
  async (registerData: TRegisterData) => await registerUserApi(registerData)
);

export const loginUser: any = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: TLoginData) => {
    const data = await loginUserApi({ email, password });
    if (!data.success) {
      return data;
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const getUser: any = createAsyncThunk('user/getUser', async () =>
  getUserApi()
);

export const getOrdersAll: any = createAsyncThunk('user/ordersUser', async () =>
  getOrdersApi()
);

export const updateUser: any = createAsyncThunk(
  'user/updateUser',
  async (data: TRegisterData) => updateUserApi(data)
);

export const logoutUser: any = createAsyncThunk(
  'user/logoutUser',
  async (_, { dispatch }) =>
    logoutApi()
      .then(() => {
        localStorage.clear();
        deleteCookie('accessToken');
        dispatch(userLogout());
      })
      .catch(() => {
        console.log('Ошибка выполнения выхода');
      })
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogout: (state) => {
      state.userData = null;
    },
    resetError: (state) => {
      state.error = null;
    }
  },
  selectors: {
    getUserState: (state) => state,
    getError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        (state.request = true), (state.error = null);
        state.isAuthChecked = true;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        (state.request = false),
          (state.error = action.error.message as string),
          (state.isAuthChecked = false);
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        (state.request = false),
          (state.error = null),
          (state.response = action.payload);
        state.userData = action.payload.user;
        state.isAuthChecked = false;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.pending, (state) => {
        state.loginUserRequest = true;
        state.error = null;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.isAuthChecked = false;
        state.error = action.error.message as string;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.error = null;
        state.loginUserRequest = false;
        state.isAuthChecked = false;
        state.isAuthenticated = true;
        state.userData = action.payload.user;
      })
      .addCase(getUser.pending, (state) => {
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        state.loginUserRequest = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.isAuthChecked = false;
        state.loginUserRequest = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.loginUserRequest = false;
        state.userData = action.payload.user;
        state.isAuthChecked = false;
      })
      .addCase(updateUser.pending, (state) => {
        (state.request = true), (state.error = null);
      })
      .addCase(updateUser.rejected, (state, action) => {
        (state.request = false), (state.error = action.error.message as string);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        (state.request = false),
          (state.error = null),
          (state.response = action.payload);
      })
      .addCase(logoutUser.pending, (state) => {
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        state.error = null;
        state.request = true;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isAuthenticated = true;
        state.isAuthChecked = false;
        state.error = action.error.message as string;
        state.request = false;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isAuthenticated = false;
        state.isAuthChecked = false;
        state.error = null;
        state.request = false;
        state.response = action.payload;
        state.userData = initialState.userData;
      })
      .addCase(getOrdersAll.pending, (state) => {
        state.error = null;
        state.request = true;
      })
      .addCase(getOrdersAll.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.request = false;
      })
      .addCase(getOrdersAll.fulfilled, (state, action) => {
        state.error = null;
        state.request = false;
        state.userOrders = action.payload;
      });
  }
});

export const { userLogout, resetError } = userSlice.actions;
export const { getUserState, getError } = userSlice.selectors;
export default userSlice.reducer;
