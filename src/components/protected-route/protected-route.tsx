import { Preloader } from '@ui';
import { useSelector } from '../../services/store';

import { Navigate, useLocation } from 'react-router';
import { AuthCheckedSelector, UserSelector } from '../../services/auth/slice';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  component: React.JSX.Element;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  component
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(AuthCheckedSelector);
  const user = useSelector(UserSelector);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }
  if (onlyUnAuth && user) {
    const { from } = location.state ?? { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({
  component
}: {
  component: React.JSX.Element;
}): React.JSX.Element => <ProtectedRoute onlyUnAuth component={component} />;
