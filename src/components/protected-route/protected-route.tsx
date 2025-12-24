import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../services/store';
import {
  selectIsAuthenticated,
  selectIsAuthChecked
} from '../../services/slices/AuthSlice';
import { Preloader } from '../ui/preloader';

type ProtectedRouteProps = {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  children,
  onlyUnAuth = false
}: ProtectedRouteProps) => {
  const isAuth = useAppSelector(selectIsAuthenticated);
  const isAuthChecked = useAppSelector(selectIsAuthChecked);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && isAuth) {
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !isAuth) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};
