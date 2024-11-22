import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { getUserAuth } from '../../services/slices/userSlice';
import React from 'react';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  children: React.ReactNode;
  onlyUnAuthorized?: boolean;
};

const ProtectedRoute = ({
  onlyUnAuthorized = false,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(getUserAuth);
  const location = useLocation();

  if (isAuthChecked === undefined) {
    return <Preloader />;
  }

  if (!onlyUnAuthorized && !isAuthChecked) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }
  if (onlyUnAuthorized && isAuthChecked) {
    const prevPage = location.state?.from || { pathname: '/' };
    return <Navigate replace to={prevPage} />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
