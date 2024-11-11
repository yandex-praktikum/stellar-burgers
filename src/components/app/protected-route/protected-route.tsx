// import { FC, ReactNode } from 'react';
// import { useSelector } from 'react-redux';
// import { Navigate, useLocation } from 'react-router-dom';
// import { RootState } from '../../../services/store';

// interface ProtectedRouteProps {
//   children: ReactNode;
//   redirectTo?: string; // Опционально: задайте страницу для редиректа
// }

// const ProtectedRoute: FC<ProtectedRouteProps> = ({
//   children,
//   redirectTo = '/login'
// }) => {
//   const { user } = useSelector((state: RootState) => state.user);
//   const location = useLocation();

//   // Если пользователь не авторизован, перенаправляем его
//   if (!user) {
//     return <Navigate to={redirectTo} state={{ from: location }} replace />;
//   }

//   return <>{children}</>; // Отображаем защищённые компоненты, если пользователь авторизован
// };

// export default ProtectedRoute;

import { Navigate, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { Preloader } from '@ui';
import { RootState } from 'src/services/store';

type TProtectedRouteProps = {
  onlyUnAuth?: boolean;
  component: React.JSX.Element;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  component
}: TProtectedRouteProps) => {
  const isAuthChecked = useSelector(
    (state: RootState) => state.user.isAuthorized
  );
  const user = useSelector((state: RootState) => state.user);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate replace to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({ component }: { component: React.JSX.Element }) => (
  <ProtectedRoute onlyUnAuth component={component} />
);
