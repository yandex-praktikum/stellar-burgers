import { FC, ReactElement } from 'react';
import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';
import { RootState } from '../../services/store';
import { Preloader } from '@ui';

type TProtectedRouteProps = {
  notInit?: boolean;
  children: ReactElement;
};
export const ProtectedRoute: FC<TProtectedRouteProps> = ({
  notInit = false,
  children
}) => {
  const location = useLocation();

  const dataUser = useSelector((state: RootState) => state.userReducer);

  if (!dataUser.isAuthChecked) {
    return <Preloader />;
  }

  if (notInit && dataUser.data.email && dataUser.data.name) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  if (!notInit && (!dataUser.data.email || !dataUser.data.name)) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};
