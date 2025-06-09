import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { selectUserData } from '../../slices/userSlice';

export const AppHeader: FC = () => {
  const user = useSelector(selectUserData);
  const userName = user ? user.name : undefined;

  return <AppHeaderUI userName={userName} />;
};
