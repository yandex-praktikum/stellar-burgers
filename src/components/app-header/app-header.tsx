import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'react-redux';
import { RootState } from 'src/services/store';

export const AppHeader: FC = () => {
  const userName = useSelector((state: RootState) => state.user.user?.name);
  return <AppHeaderUI userName={userName ? userName : ''} />;
};
