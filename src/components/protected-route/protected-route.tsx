import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { Preloader } from '@ui';
import { getIsAuthChecked, getUser } from '@selectors';

type ProtectedRouteProps = {
  children: React.ReactElement;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useSelector(getUser);
  const isAuthChecked = useSelector(getIsAuthChecked);

  if (!isAuthChecked) {
    // пока идёт чекаут пользователя, показываем прелоадер
    return <Preloader />;
  }

  if (user === null) {
    // если пользователя в хранилище нет, то делаем редирект
    return <Navigate replace to='/login' />;
  }

  return children;
};
