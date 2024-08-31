import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  registerUserApi,
  loginUserApi,
  forgotPasswordApi,
  resetPasswordApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  TRegisterData,
  TLoginData
} from '@api';
import { deleteCookie, getCookie, setCookie } from '../utils/cookie';

type TAuthState = {
  user: TUser | null;
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  error: string | null;
};

const initialState: TAuthState = {
  user: null,
  isAuthChecked: false,
  error: null,
  isAuthenticated: false
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);
    return response;
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);
    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);
    return response;
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (data: { email: string }) => {
    const response = await forgotPasswordApi(data);
    return response;
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (data: { password: string; token: string }) => {
    const response = await resetPasswordApi(data);
    return response;
  }
);

// export const getUser = createAsyncThunk(
//   'getUser',
//   async (_, { dispatch }) => {
//     if (getCookie('accessToken')) {
//       getUserApi()
//         .then((res) => dispatch(setUser(res.user)))
//         .finally(() => dispatch(setAuthChecked(true)));
//     } else {
//       dispatch(setAuthChecked(true));
//     }
//   }
// );

export const checkUserAuth = createAsyncThunk(
  'user/checkAuth',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      getUserApi()
        .then((res) => dispatch(setUser(res.user)))
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  }
);

export const getUser = createAsyncThunk('auth/getUser', async (_) => {
  const response = await getUserApi();
  return response;
});

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (user: Partial<TRegisterData>) => {
    const response = await updateUserApi(user);
    return response;
  }
);

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  const res = await logoutApi();
  if (res.success) {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    }
  },
  selectors: {
    getAuthUser: (state) => state.user,
    getAuthChecked: (state) => state.isAuthenticated,
    getLoading: (state) => state.isAuthChecked,
    getErrorMessage: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      // Register user
      .addCase(registerUser.pending, (state) => {
        state.isAuthChecked = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthChecked = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.payload as string;
      })
      // Login user
      .addCase(loginUser.pending, (state) => {
        state.isAuthChecked = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthChecked = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.payload as string;
      })
      // Forgot password
      .addCase(forgotPassword.pending, (state) => {
        state.isAuthChecked = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isAuthChecked = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.payload as string;
      })
      // Reset password
      .addCase(resetPassword.pending, (state) => {
        state.isAuthChecked = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isAuthChecked = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.payload as string;
      })
      // Get user
      .addCase(getUser.pending, (state) => {
        state.isAuthChecked = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isAuthChecked = false;
        state.user = action.payload.user;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.payload as string;
      })
      // Update user
      .addCase(updateUser.pending, (state) => {
        state.isAuthChecked = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isAuthChecked = false;
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.payload as string;
      })
      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.isAuthChecked = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthChecked = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.payload as string;
      });
  }
});

export const { setAuthChecked, setUser, setLoading } = authSlice.actions;
export const { getAuthUser, getAuthChecked, getLoading, getErrorMessage } =
  authSlice.selectors;

export default authSlice.reducer;
