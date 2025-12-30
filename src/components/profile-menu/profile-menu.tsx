import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';

interface ProfileMenuProps {
  onLogout: () => void;
}

export const ProfileMenu: FC<ProfileMenuProps> = ({ onLogout }) => {
  const { pathname } = useLocation();

  const handleLogout = () => {
    onLogout();
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
