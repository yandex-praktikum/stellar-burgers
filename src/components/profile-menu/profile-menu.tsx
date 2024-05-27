import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../../src/services/store';
import { logout } from '../../../src/slices/userSlice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
