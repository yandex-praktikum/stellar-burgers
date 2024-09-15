import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const userName = useSelector((store) => store.userData.user?.name);
  return <AppHeaderUI userName={userName || ''} />;
};
