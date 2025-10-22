import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';

//// здесь логаут

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();

  const handleLogout = () => {
    console.log('logout');
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
