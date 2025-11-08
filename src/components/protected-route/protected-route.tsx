import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import {
  getIsAuthenticated,
  getIsAuthChecked
} from '../../services/selectors/userSelectors';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  children,
  onlyUnAuth = false
}: ProtectedRouteProps) => {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const isAuthChecked = useSelector(getIsAuthChecked);
  const location = useLocation();

  // Показываем прелоадер, пока проверяется авторизация
  if (!isAuthChecked) {
    return <Preloader />;
  }

  // Если это роут только для неавторизованных (login, register и т.д.)
  if (onlyUnAuth && isAuthenticated) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate to={from} replace />;
  }

  // Если это защищенный роут и пользователь не авторизован
  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};
