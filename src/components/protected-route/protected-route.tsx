import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '@store';
import { Preloader } from '../ui/preloader';
import { getUserState } from '../../services/slices/userSlice';

type ProtectedRouteProps = {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  children,
  onlyUnAuth
}: ProtectedRouteProps) => {
  const location = useLocation();

  const data = useSelector(getUserState).userData;
  const isAuthChecked = useSelector(getUserState).isAuthChecked;
  const isAuthenticated = useSelector(getUserState).isAuthenticated;

  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && isAuthenticated) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  if (isAuthChecked) {
    return <Preloader />;
  }

  return children;
};
