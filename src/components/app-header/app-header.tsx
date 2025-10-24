import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { userNameSelector } from '../../services/slices/userSlice';

export const AppHeader: FC = () => {
  const userName = useSelector(userNameSelector);
  return <AppHeaderUI userName={userName} />;
};
