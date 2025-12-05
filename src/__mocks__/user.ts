import { TUser } from '@utils-types';

export const mockUser: TUser = {
  email: 'test@test.com',
  name: 'Test User'
};

export const mockAuthResponse = {
  success: true,
  accessToken: 'Bearer mock-access-token',
  refreshToken: 'mock-refresh-token',
  user: mockUser
};

export const mockUserResponse = {
  success: true,
  user: mockUser
};
