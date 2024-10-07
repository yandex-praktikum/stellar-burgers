import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useAppSelector } from '../../services/store';
import { UsernameSelector } from '../../services/reducers/authorization';

export const AppHeader: FC = () => {
  const userName = useAppSelector(UsernameSelector);

  return <AppHeaderUI userName={userName ? userName : 'Личный кабинет'} />;
};
