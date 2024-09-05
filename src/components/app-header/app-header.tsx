import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { getNameSelector } from '../../services/slices/userSlice';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const userName = useSelector(getNameSelector);
  return <AppHeaderUI userName={userName} />;
};
