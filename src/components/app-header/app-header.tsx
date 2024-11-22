import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { getUserName } from '../../services/slices/userSlice';
export const AppHeader: FC = () => (
  <AppHeaderUI userName={useSelector(getUserName)} />
);
