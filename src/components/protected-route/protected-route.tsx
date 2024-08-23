import React from 'react';
import { useSelector } from 'src/services/store';
type ProtectedRouteProps = {
  children: React.ReactElement;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => children;
