import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '@store';
import { logout } from '@slices';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
    } catch (_) {}
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
