import {
  TLoginData,
  TRegisterData,
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  updateUserApi
} from '../../utils/burger-api';

import { createAsyncThunk, createSlice, isAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';

export const getUser = createAsyncThunk('user/get', async () => getUserApi());

export const checkUser = createAsyncThunk('user/check', (_, { dispatch }) => {
  if (getCookie('accessToken')) {
    dispatch(getUser()).finally(() => {
      dispatch(authChecked());
    });
  } else {
    dispatch(authChecked());
  }
});

export const updateUser = createAsyncThunk(
  'user/update',
  async (user: Partial<TRegisterData>) => updateUserApi(user)
);

export const userRegister = createAsyncThunk(
  'user/register',
  async ({ email, name, password }: TRegisterData, { rejectWithValue }) => {
    const data = await registerUserApi({ email, name, password });
    if (!data?.success) {
      return rejectWithValue(data);
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
      return rejectWithValue(data);
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const userLogout = createAsyncThunk('user/logout', async () => {
  logoutApi().then(() => {
    deleteCookie('accessToken');
    localStorage.clear();
  });
});

export interface IUserSlice {
  user: TUser | null;
  isAuthChecked: boolean;
  error: string | null;
  isLoading: boolean;
}

export const initialState: IUserSlice = {
  user: null,
  isAuthChecked: false,
  error: null,
  isLoading: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  selectors: {
    selectUser: (state) => state
  },
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    // getUser
    builder
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false;
        state.error = 'загрузка пользователя не удалась';
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        console.log(state);
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
        state.isAuthChecked = true;
      })
      // checkUser
      .addCase(checkUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthChecked = false;
        state.error = 'пользователь не зарегистрирован';
      })
      .addCase(checkUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthChecked = true;
      })
      // updateUser
      .addCase(updateUser.rejected, (state) => {
        state.isLoading = false;
        state.error = 'обновление пользователя неу удалось';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      // userRegister
      .addCase(userRegister.rejected, (state) => {
        state.isLoading = false;
        state.error = 'регистрация не удалась';
      })
      .addCase(userRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      // userLogin
      .addCase(userLogin.rejected, (state) => {
        state.isLoading = false;
        state.isAuthChecked = false;
        state.error = 'вход не удался';
      })
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.user = action.payload;
      })
      // userLogout
      .addCase(userLogout.rejected, (state) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.error = 'выход не удался';
      })
      .addCase(userLogout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      });
  }
});

export const { authChecked } = userSlice.actions;
export const { selectUser } = userSlice.selectors;
export default userSlice.reducer;
