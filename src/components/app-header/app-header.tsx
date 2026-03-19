import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { RootState, useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const { user, isAuth } = useSelector((state: RootState) => state.user);
  const userName = isAuth && user ? user.name : '';
  return <AppHeaderUI userName={userName} />;
};
