import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { selectUserData } from '../../slices/user-slice';

export const AppHeader: FC = () => {
  const user = useSelector(selectUserData);

  // проверка что user имеет поле name
  const userName = user ? user.name : undefined;

  return <AppHeaderUI userName={userName} />;
};
