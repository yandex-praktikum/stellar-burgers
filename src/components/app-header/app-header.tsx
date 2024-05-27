import { FC } from 'react';
import { AppHeaderUI } from '@ui';

export const AppHeader: FC = () => {
  const userString = localStorage.getItem('user') || '';
  const user = userString ? JSON.parse(userString) : null;
  const userName = user ? user.name : '';

  return <AppHeaderUI userName={userName} />;
};
