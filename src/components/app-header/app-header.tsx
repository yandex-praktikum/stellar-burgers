import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';

export const AppHeader: FC = () => {
  const userData = useSelector((state: RootState) => state.userReducer);

  return <AppHeaderUI userName={userData.data.name} />;
};
