import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import type { RootState } from '../../services/store';

type Props = {
  children: JSX.Element;
};

export const AuthRoute: FC<Props> = ({ children }) => {
  const { isAuth } = useSelector((state: RootState) => state.user);
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }
  return children;
};
