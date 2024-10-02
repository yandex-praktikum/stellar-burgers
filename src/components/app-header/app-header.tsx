import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { getName } from '../../services/slices/userSlice';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const userName = useSelector(getName);

  return <AppHeaderUI userName={userName} />;
};
