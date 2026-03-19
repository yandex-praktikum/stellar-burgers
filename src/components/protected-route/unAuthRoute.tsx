import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import type { RootState } from '../../services/store';

type Props = {
  children: JSX.Element;
};

export const UnAuthRoute: FC<Props> = ({ children }) => {
  const { isAuth } = useSelector((state: RootState) => state.user);
  const location = useLocation();

  if (isAuth) {
    const state = location.state as { from?: Location } | null;
    const from = state?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }
  return children;
};
