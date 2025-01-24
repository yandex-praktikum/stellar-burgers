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
import { setCookie, deleteCookie } from 'src/utils/cookie';

interface TUserState {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  loginError?: SerializedError;
  registerError?: SerializedError;
  data: TUser;
}

export const initialState: TUserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  data: {
    name: '',
    email: ''
  }
};

const register = createAsyncThunk<TUser, TRegisterData>(
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

export const login = createAsyncThunk<TUser, TLoginData>(
  'user/login',
  async (dataUser, { rejectWithValue }) => {
    const data = await loginUserApi(dataUser);
    if (!data?.success) {
      return rejectWithValue(data);
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const logout = createAsyncThunk<void, void>(
  'user/logout',
  async (_, { dispatch }) => {
    await logoutApi().then(() => {
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
      dispatch(logout());
    });
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
      .addCase(register.pending, (state) => {
        state.registerError = undefined;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.registerError = undefined;
        state.isAuthenticated = true;

        state.data = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.registerError = action.meta.rejectedWithValue
          ? (action.payload as SerializedError)
          : action.error;
      })
      .addCase(login.pending, (state, action) => {
        state.loginError = undefined;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginError = undefined;
        state.isAuthenticated = true;

        state.data = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loginError = action.meta.rejectedWithValue
          ? (action.payload as SerializedError)
          : action.error;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;

        state.data = {
          email: '',
          name: ''
        };
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.isAuthChecked = true;

        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isAuthChecked = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  }
});

export default userSlice.reducer;
