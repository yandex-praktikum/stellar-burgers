import { FC } from 'react';
import { useSelector } from '../../services/store';
import { AppHeaderUI } from '@ui';

export const AppHeader: FC = () => {
  const { user } = useSelector((state) => state.user);
  return <AppHeaderUI userName={user?.name || ''} />;
};
