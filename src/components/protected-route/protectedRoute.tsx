import { Route } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactElement;
  isAuthRequired: boolean;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => (
  <Route>children</Route>
);
