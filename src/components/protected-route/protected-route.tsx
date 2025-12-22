import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../services/store';
import { selectIsAuthenticated } from '../../services/slices/AuthSlice';
type ProtectedRouteProps = {
  children: JSX.Element;
};
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuth = useAppSelector(selectIsAuthenticated);
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};
