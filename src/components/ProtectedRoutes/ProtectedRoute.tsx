import React, { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { selectUserAuthenticated } from '../../Slices/userSlice';

type ProtectedRouteProps = {
  children: ReactNode;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children
}: ProtectedRouteProps) => {
  const userAuth = useSelector(selectUserAuthenticated);
  let location = useLocation();

  // if (!userAuth) {
  //   return (
  //     <>
  //       <Navigate to='/login' state={{ from: location }} />
  //     </>
  //   );
  // }

  return children;
};
