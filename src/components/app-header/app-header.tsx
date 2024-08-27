import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'react-redux';
import { getName } from '../../services/slices/userData';

export const AppHeader: FC = () => {
  const user = useSelector(getName);
  return <AppHeaderUI userName={user} />;
};
