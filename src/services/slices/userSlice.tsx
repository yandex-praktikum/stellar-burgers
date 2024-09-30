import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

export const apiGetUser = createAsyncThunk('user/getUser', getUserApi);
export const updateUser = createAsyncThunk('user/update', updateUserApi);
export const registerFetch = createAsyncThunk('user/register', registerUserApi);
export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }: Omit<TRegisterData, 'name'>) => {
    const data = await loginUserApi({ email, password });

    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

    return data.user;
  }
);

export const logout = createAsyncThunk('user/logout', () => {
  logoutApi().then(() => {
    localStorage.clear();
    deleteCookie('accessToken');
  });
});

export interface TUserState {
  isAuthChecked: boolean;
  user: TUser;
  error: string | undefined;
}

export const initialState: TUserState = {
  isAuthChecked: false,
  user: {
    email: '',
    name: ''
  },
  error: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    isAuthCheckedSelector: (state) => state.isAuthChecked,
    getUserSelector: (state) => state.user,
    getNameSelector: (state) => state.user.name,
    getErrorSelector: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerFetch.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
        state.error = '';
      })
      .addCase(registerFetch.pending, (state) => {
        state.error = '';
      })
      .addCase(registerFetch.rejected, (state, action) => {
        state.error = action.error.message;
      });
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload;
        state.error = '';
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error.message;
      })
      .addCase(login.pending, (state) => {
        state.isAuthChecked = false;
        state.error = '';
      });
    builder
      .addCase(apiGetUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
      })
      .addCase(apiGetUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error.message!;
      });
    builder
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error.message!;
      })
      .addCase(updateUser.pending, (state) => {
        state.error = '';
      });
    builder.addCase(logout.fulfilled, (state) => {
      state.isAuthChecked = false;
      state.user = { email: '', name: '' };
    });
  }
});

export const {
  isAuthCheckedSelector,
  getUserSelector,
  getNameSelector,
  getErrorSelector
} = userSlice.selectors;
export const userReducer = userSlice.reducer;
