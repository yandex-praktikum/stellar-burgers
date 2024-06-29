import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const location = useLocation();
  const userName = useSelector((state) => state.user.user.name);
  return (
    <AppHeaderUI userName={userName ? userName : ''} path={location.pathname} />
  );
};
