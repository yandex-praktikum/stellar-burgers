import { ProfileMenuUI } from '@ui';
import { FC } from 'react';
import { redirect, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../services/store';
import { fetchLogout } from '../../slices/stellarBurgerSlice';
import { deleteCookie } from '../../utils/cookie';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(fetchLogout())
      .unwrap()
      .then((payload) => {
        if (payload.success) {
          localStorage.removeItem('refreshToken');
          deleteCookie('accessToken');
        }
      });
    redirect('/');
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
