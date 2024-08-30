import React from 'react';
import { useSelector } from '../../services/store';
import { useLocation, Navigate } from 'react-router-dom';
import { selectUser } from '../../services/slices/userSlice';
import { Preloader } from '../../components/ui/preloader/preloader';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  children,
  onlyUnAuth
}: ProtectedRouteProps) => {
  const location = useLocation();
  const { user, isAuthChecked } = useSelector(selectUser);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    return <Navigate replace to={location.state?.from || { pathname: '/' }} />;
  }
  if (!onlyUnAuth && !user) {
    return (
      <Navigate
        replace
        to='/login'
        state={{
          from: location
        }}
      />
    );
  }
  return children;
};
