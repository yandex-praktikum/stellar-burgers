import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TRegisterData,
  updateUserApi
} from '../../utils/burger-api';
import { TOrder, TUser } from '../../utils/types';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';

export const registerUserApiThunk = createAsyncThunk(
  'user/register',
  (data: TRegisterData) => registerUserApi(data)
);
export const getUserApiThunk = createAsyncThunk('user/get', getUserApi);
export const loginUserThunk = createAsyncThunk('user/login', loginUserApi);
export const updateUserApiThank = createAsyncThunk(
  'user/update',
  updateUserApi
);
export const logoutUserThunk = createAsyncThunk(
  'user/logout',
  (_, { dispatch }) => {
    logoutApi()
      .then(() => {
        localStorage.clear(); // очищаем refreshToken
        deleteCookie('accessToken'); // очищаем accessToken
        dispatch(userLogout()); // удаляем пользователя из хранилища
      })
      .catch(() => {
        console.log('Ошибка выполнения выхода');
      });
  }
);

export const checkUserAuthThunk = createAsyncThunk(
  'user/checkUser',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      try {
        console.log('pipa');
        await dispatch(getUserApiThunk());
      } catch (error) {
        //  если случилась ошибка
        console.error(error);
      } finally {
        dispatch(authChecked());
      }
    } else {
      dispatch(authChecked());
    }
  }
);

export const getOrdersApiThunk = createAsyncThunk('orders', getOrdersApi);

export interface userState {
  isLoading: boolean;
  user: TUser | null;
  isAuthChecked: boolean;
  orders: TOrder[];
}
const initialState: userState = {
  isLoading: false,
  user: null,
  isAuthChecked: false,
  orders: []
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogout: (state) => {
      state.user = null;
    },
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  selectors: {
    getUser: (state) => state.user,
    getIsAuthChecked: (state) => state.isAuthChecked,
    getOrders: (state) => state.orders
  },
  extraReducers: (builder) => {
    //getUser
    builder.addCase(registerUserApiThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUserApiThunk.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(registerUserApiThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      setCookie('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    });
    //getUserApi
    builder.addCase(getUserApiThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserApiThunk.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getUserApiThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
    });
    //login
    builder.addCase(loginUserThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUserThunk.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      setCookie('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    });
    //getOrders
    builder.addCase(getOrdersApiThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOrdersApiThunk.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getOrdersApiThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    });
    // updateUser
    builder.addCase(updateUserApiThank.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUserApiThank.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateUserApiThank.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
    });
  }
});

export const { userLogout, authChecked } = userSlice.actions;
export const userReducer = userSlice.reducer;
