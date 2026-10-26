import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';

import { useSelector } from '../../services/store';

import type React from 'react';

type ProtectedRouteProps = {
  onlyAuth?: boolean; // авторизованные пользователи
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyAuth = false,
  children,
}: ProtectedRouteProps): React.JSX.Element => {
  const { user, isAuthChecked } = useSelector((state) => state.user);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  if (onlyAuth && !user) {
    return <Navigate replace to="/login" state={{ from: location }} />;
  }

  return children;
};
