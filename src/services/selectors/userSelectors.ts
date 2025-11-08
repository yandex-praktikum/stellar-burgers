import { RootState } from '../store';

export const getUser = (state: RootState) => state.user.user;
export const getIsAuthenticated = (state: RootState) =>
  state.user.isAuthenticated;
export const getIsAuthChecked = (state: RootState) => state.user.isAuthChecked;
export const getLoginRequest = (state: RootState) => state.user.loginRequest;
export const getLoginError = (state: RootState) => state.user.loginError;
export const getRegisterRequest = (state: RootState) =>
  state.user.registerRequest;
export const getRegisterError = (state: RootState) => state.user.registerError;
