import { deleteCookie, setCookie } from './cookie';

export const storeTokens = (refreshToken: string, accessToken: string) => {
  localStorage.setItem('refreshToken', String(refreshToken));

  setCookie('accessToken', String(accessToken));
};

export const clearTokens = () => {
  localStorage.removeItem('refreshToken');

  deleteCookie('accessToken');
};
