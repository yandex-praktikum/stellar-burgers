import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TRegisterData, TLoginData } from '../utils/burger-api';
import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi
} from '@api';
import { TUser } from '@utils-types';
import { setCookie, deleteCookie } from '../utils/cookie';

interface IUserState {
  user: TUser | null;
  isAuthChecked: boolean;
  requestStatus: boolean;
  loginUserError: string | null | undefined;
}

const initialState: IUserState = {
  user: null,
  isAuthChecked: false,
  requestStatus: false,
  loginUserError: null
};

export const loginUserThunk = createAsyncThunk(
  'user/loginUserThunk',
  async ({ email, password }: TLoginData, thunkAPI) => {
    const data = await loginUserApi({ email, password });

    if (!data.success) {
      return Promise.reject(data);
    }
    localStorage.setItem('refreshToken', data.refreshToken);
    setCookie('accessToken', data.accessToken);
    return data;
  }
);

export const getUserThunk = createAsyncThunk(
  'user/getUserThunk',
  async (_, thunkAPI) => {
    const data = await getUserApi();
    if (!data.success) {
      return Promise.reject(data);
    }
    return data;
  }
);

export const registerUserThunk = createAsyncThunk(
  'user/registerUserThunk',
  async ({ email, name, password }: TRegisterData, thunkAPI) => {
    const registers = await registerUserApi({ email, name, password });
    if (!registers.success) {
      return Promise.reject(registers);
    }
    localStorage.setItem('refreshToken', registers.refreshToken);
    setCookie('accessToken', registers.accessToken);
    return registers;
  }
);

export const updateUserThunk = createAsyncThunk(
  'user/updateUserThunk',
  async (user: TRegisterData, thunkAPI) => {
    const data = await updateUserApi(user);

    if (!data.success) {
      return Promise.reject(data);
    }
    return data;
  }
);

export const logoutThunk = createAsyncThunk(
  'user/logoutThunk',
  async (_, thunkAPI) => {
    const data = await logoutApi();
    if (!data.success) {
      return Promise.reject(data);
    }
    localStorage.removeItem('refreshToken');
    deleteCookie('accessToken');
    return data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthChecked: (state) => {
      state.isAuthChecked = true;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUserThunk.pending, (state) => {
      state.requestStatus = true;
      state.loginUserError = null;
    });
    builder.addCase(loginUserThunk.rejected, (state, payload) => {
      state.isAuthChecked = true;
      state.loginUserError = payload.error.message;
      state.requestStatus = false;
    });
    builder.addCase(loginUserThunk.fulfilled, (state, { payload }) => {
      state.isAuthChecked = true;
      state.user = payload.user;
      state.requestStatus = false;
    });

    builder.addCase(getUserThunk.pending, (state) => {
      state.requestStatus = true;
    });
    builder.addCase(getUserThunk.rejected, (state, payload) => {
      state.requestStatus = false;
      state.isAuthChecked = true;
      state.loginUserError = payload.error.message;
    });
    builder.addCase(getUserThunk.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isAuthChecked = true;
    });

    builder.addCase(registerUserThunk.pending, (state) => {
      state.requestStatus = true;
    });
    builder.addCase(registerUserThunk.rejected, (state, payload) => {
      state.requestStatus = false;
      state.isAuthChecked = true;
      state.loginUserError = payload.error.message;
    });
    builder.addCase(registerUserThunk.fulfilled, (state, { payload }) => {
      state.user = payload.user;
      state.isAuthChecked = true;
    });

    builder.addCase(updateUserThunk.pending, (state) => {
      state.requestStatus = true;
      state.loginUserError = null;
    });
    builder.addCase(updateUserThunk.rejected, (state, payload) => {
      state.isAuthChecked = true;
      state.loginUserError = payload.error.message;
      state.requestStatus = false;
    });
    builder.addCase(updateUserThunk.fulfilled, (state, { payload }) => {
      state.isAuthChecked = true;
      state.user = payload.user;
      state.requestStatus = false;
    });

    builder.addCase(logoutThunk.pending, (state) => {
      state.requestStatus = true;
    });
    builder.addCase(logoutThunk.rejected, (state, payload) => {
      state.requestStatus = false;
      state.loginUserError = payload.error.message;
    });
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.user = null;
    });
  },
  selectors: {
    selectUser: (sliceState) => sliceState.user,
    selectIsAuthChecked: (sliceState) => sliceState.isAuthChecked
  }
});

export const { selectUser, selectIsAuthChecked } = userSlice.selectors;
export const { setAuthChecked, setUser } = userSlice.actions;
export default userSlice.reducer;
