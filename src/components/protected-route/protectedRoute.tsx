import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getIsAuthorized } from '../../services/slices/userData';

type ProtectedRouteProps = {
  children: React.ReactElement;
  isAuthRequired: boolean;
};

export const ProtectedRoute = ({
  isAuthRequired = false,
  children
}: ProtectedRouteProps) => {
  const isUserAuthorized = useSelector(getIsAuthorized);
  if (isUserAuthorized !== isAuthRequired) {
    const location = useLocation();
    if (isUserAuthorized) {
      const previousPage = location.state?.from || { pathname: '/' };
      return <Navigate replace to={previousPage} />;
    }
    return <Navigate replace to='/login' state={{ from: location }} />;
  }
  return children;
};
