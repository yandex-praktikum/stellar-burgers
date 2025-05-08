import {
  TRegisterData,
  registerUserApi,
  TLoginData,
  loginUserApi,
  logoutApi,
  getUserApi,
  updateUserApi
} from '@api';
import {
  SerializedError,
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { setCookie, deleteCookie } from '../utils/cookie';
import { RootState } from '../services/store';

export interface TUserState {
  data: TUser | null;
  isAuthenticated: boolean;
  loginError?: SerializedError;
  registerError?: SerializedError;
}

export const initialState: TUserState = {
  data: null,
  isAuthenticated: false
};

export const registerUser = createAsyncThunk<TUser, TRegisterData>(
  'user/register',
  async (dataUser, { rejectWithValue }) => {
    const data = await registerUserApi(dataUser);
    if (!data.success) {
      return rejectWithValue(data);
    }
    setCookie('accessToken', data.accessToken);
    setCookie('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const loginUser = createAsyncThunk<TUser, TLoginData>(
  'user/login',
  async (dataUser, { rejectWithValue }) => {
    try {
      const data = await loginUserApi(dataUser);
      if (!data?.success) {
        return rejectWithValue(data);
      }
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data.user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logoutUser = createAsyncThunk<void, void>(
  'user/logout',
  async (_, { dispatch }) => {
    await logoutApi();
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  }
);

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, { rejectWithValue }) => {
    const response = await getUserApi();
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response.user;
  }
);

export const updateUser = createAsyncThunk<TUser, Partial<TRegisterData>>(
  'user/update',
  async (data, { rejectWithValue }) => {
    const response = await updateUserApi(data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response.user;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.registerError = undefined;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerError = undefined;
        state.isAuthenticated = true;

        state.data = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerError = action.meta.rejectedWithValue
          ? (action.payload as SerializedError)
          : action.error;
      })
      .addCase(loginUser.pending, (state) => {
        state.loginError = undefined;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginError = undefined;
        state.isAuthenticated = true;

        state.data = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginError = action.meta.rejectedWithValue
          ? (action.payload as SerializedError)
          : action.error;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;

        state.data = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;

        state.data = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  }
});

export const selectIsAuthenticated = (state: RootState) =>
  state.user.isAuthenticated;
export const selectUserData = (state: RootState) => state.user.data;
export const selectLoginError = (state: RootState) => state.user.loginError;
export const selectRegisterError = (state: RootState) =>
  state.user.registerError;

export default userSlice.reducer;
