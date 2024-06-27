import React, { FC, ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  NavLink,
  Navigate,
  Outlet,
  useLocation,
  useNavigate
} from 'react-router-dom';
import {
  selectIsAuthChecked,
  selectUserAuthenticated,
  selectUserData
} from '../../Slices/userSlice';
import { Login } from 'src/pages/login';
import { Preloader } from '../ui/preloader';

type ProtectedRouteProps = {
  children: ReactNode;
};

export const ProtectedRouteAuth: FC<ProtectedRouteProps> = ({
  children
}: ProtectedRouteProps) => {
  const userAuthenticated = useSelector(selectUserAuthenticated);
  const userAuthChecked = useSelector(selectIsAuthChecked);
  const navigate = useNavigate();
  if (!userAuthChecked) {
    return <Preloader />;
  }

  if (userAuthenticated) {
    return <Navigate to='/' />;
  }

  return children;
};
