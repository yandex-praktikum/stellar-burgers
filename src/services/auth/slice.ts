import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { loginUser, logoutUser, registerUser, updateUser } from './action';

interface IUserState {
  user: TUser | null;
  isAuthChecked: boolean;
  error: string | null | undefined;
}

const initialState: IUserState = {
  user: null,
  isAuthChecked: false,
  error: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isAuthChecked = true;
      });

    builder
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });

    builder
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
  selectors: {
    UserSelector: (state) => state.user,
    AuthCheckedSelector: (state) => state.isAuthChecked,
    UserNameSelector: (state) => state.user?.name
  }
});

export const { UserSelector, AuthCheckedSelector, UserNameSelector } =
  authSlice.selectors;

export const { setUser, setIsAuthChecked } = authSlice.actions;
