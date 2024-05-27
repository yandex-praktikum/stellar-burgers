import { useSelector } from '../../../src/services/store';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  if (onlyUnAuth) {
    if (isAuthenticated) {
      return <Navigate replace to='/' />;
    } else {
      return children;
    }
  }

  if (!isAuthenticated) {
    return <Navigate replace to='/login' />;
  }

  return children;
};
