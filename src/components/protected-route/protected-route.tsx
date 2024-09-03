import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from '../../services/store';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const user = useSelector((state) => state.profile.user);

  return user ? <>{children}</> : <Navigate to='/login' replace />;
};

export default ProtectedRoute;
