import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isAuthCheckedSelector } from '../userSlice';
export const AppHeader: FC = () => {
  const navigate = useNavigate();
  const isAuthChecked = useSelector(isAuthCheckedSelector);

  const handleOrdersClick = () => {
    navigate('/feed');
  };

  const handleConstructorClick = () => {
    navigate('/');
  };

  const handleProfileClick = () => {
    if (!isAuthChecked) {
      navigate('/login');
    } else {
      navigate('/profile');
    }
  };

  return (
    <AppHeaderUI
      userName=''
      onOrdersClick={handleOrdersClick}
      onConstructorClick={handleConstructorClick}
      onProfileClick={handleProfileClick}
    />
  );
};
