import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useAppSelector } from '@store';

export const AppHeader: FC = () => (
  <AppHeaderUI
    userName={useAppSelector((state) => state.userState.user?.name) || ''}
  />
);
