import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router';
import { Preloader } from '../ui/preloader';
import {
  getAuthChecked,
  getAuthUser,
  getLoading
} from '../../services/authSlice';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(getAuthChecked);
  const user = useSelector(getAuthUser);
  const location = useLocation();

  // if (!isAuthChecked) {
  //   return <Preloader />;
  // }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };

    return <Navigate replace to={from} />;
  }

  return children;
};
