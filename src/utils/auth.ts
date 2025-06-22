import { deleteCookie, setCookie } from './cookie';

const REFRESH_TOKEN_KEY = 'refreshToken';
const ACCESS_TOKEN_KEY = 'accessToken';

export const storeTokens = (refreshToken: string, accessToken: string) => {
  try {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  } catch (error) {
    console.error('Ошибка при сохранении refresh token в localStorage:', error);
  }

  setCookie(ACCESS_TOKEN_KEY, accessToken);
};

export const clearTokens = () => {
  try {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  } catch (error) {
    console.error('Ошибка при удалении refresh token из localStorage:', error);
  }

  deleteCookie(ACCESS_TOKEN_KEY);
};
