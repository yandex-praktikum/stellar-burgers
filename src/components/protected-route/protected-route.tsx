import React, { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';
import {
  authenticatedSelector,
  checkUserAuth,
  selectUser
} from '../../services/slices/userSlice';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = (props: ProtectedRouteProps) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthenticated = useSelector(authenticatedSelector);
  const isAuthChecked = useSelector(selectUser);

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!props.onlyUnAuth && !isAuthenticated) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (props.onlyUnAuth && isAuthenticated) {
    const from = location.state?.from || { pathname: '/' };

    return <Navigate replace to={from} />;
  }

  return props.children;
};
