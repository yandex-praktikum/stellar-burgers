import { FC, PropsWithChildren, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useSelector, useDispatch } from '../../services/store';
import { checkUserAuthThunk } from '../../services/userSlice/thunk';
import { Preloader } from '../ui/preloader';

interface IProtectedRouteProps extends PropsWithChildren {
  isOnlyAuthed?: boolean;
}

export const ProtectedRoute: FC<IProtectedRouteProps> = ({
  isOnlyAuthed,
  children
}) => {
  const userState = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (!userState.user && !userState.isAuthChecked) {
      dispatch(checkUserAuthThunk());
    }
  }, []);

  if (!userState.user && !userState.isAuthChecked) {
    return <Preloader />;
  }

  if (!userState.user && userState.isAuthChecked) {
    <Navigate to='/login' replace />;
  }

  if (!userState.user && isOnlyAuthed) {
    return <Navigate to='/login' replace state={{ from: location }} />;
  } else if (userState.user && !isOnlyAuthed) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate to={from} replace />;
  }

  return children;
};
