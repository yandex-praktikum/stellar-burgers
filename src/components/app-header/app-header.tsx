import { AppHeaderUI } from '@ui';
import { FC } from 'react';
import { useAppSelector } from '../../services/store';
import { selectUser } from '../../slices/stellarBurgerSlice';

export const AppHeader: FC = () => {
  const user = useAppSelector(selectUser);
  return <AppHeaderUI userName={user.name} />;
};
