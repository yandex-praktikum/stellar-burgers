import { Navigate, Outlet, useLocation } from 'react-router';
import { useAppSelector } from '@store';
import { FC } from 'react';
import { Preloader } from '@ui';
import { IProtectedRouteProps } from '@utils-types';
import {
  selectUserCheckedState,
  selectUserLoadingState,
  selectUser
} from '@slices';

export const ProtectedRoute: FC<IProtectedRouteProps> = ({
  isProtected = true
}) => {
  const location = useLocation();
  const user = useAppSelector(selectUser);
  const isChecked = useAppSelector(selectUserCheckedState);
  const isLoading = useAppSelector(selectUserLoadingState);

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
    const redirectTo = location.state?.from?.pathname || '/profile';
    return <Navigate to={redirectTo} replace />;
  }

  // Если маршрут не защищён или пользователь авторизован
  return <Outlet />;
};
