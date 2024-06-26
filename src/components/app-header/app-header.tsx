import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../Slices/userSlice';

export const AppHeader: FC = () => {
  const userData = useSelector(selectUserData);
  return <AppHeaderUI userName={userData?.name} />;
};
