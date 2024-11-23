import { Navigate, Outlet, useLocation } from 'react-router';
import { useAppSelector } from '@store';
import { FC } from 'react';
import { Preloader } from '@ui';
import { IProtectedRouteProps } from '@utils-types';

export const ProtectedRoute: FC<IProtectedRouteProps> = ({
  isProtected = true
}) => {
  const location = useLocation();
  const { user, isChecked, isLoading } = useAppSelector(
    (state) => state.userState
  );

  // Пока идёт загрузка
  if (isLoading || !isChecked) {
    return <Preloader />;
  }

  // Если маршрут защищён и пользователь не авторизован
  if (isProtected && !user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  // Если маршрут не защищён и пользователь авторизован
  if (!isProtected && user) {
    return <Navigate to='/profile' state={{ from: location }} replace />;
  }

  // Если маршрут не защищён или пользователь авторизован
  return <Outlet />;
};
