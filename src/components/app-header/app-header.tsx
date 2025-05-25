import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useAppSelector } from '@app-store';
import { getName } from '@slices';

export const AppHeader: FC = () => {
  const userName = useAppSelector(getName);
  return <AppHeaderUI userName={userName} />;
};
