import { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactElement;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children
}: ProtectedRouteProps) => {
  const user = useSelector((state: any) => state.userReducer);

  useEffect(() => {
    console.log('ProtectedRoute user: ', JSON.stringify(user));
  }, [user]);

  if (!user.name && !user.email) return <Navigate to='/login' />;
  else return <>{children}</>;
};
