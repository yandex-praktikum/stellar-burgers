import React from 'react';
import { Preloader } from '../../components/ui/preloader/preloader';
import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectUser } from '../../services/slices/profileSlice';

type ProtectedRouteProps = {
  anonymous?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  anonymous
}) => {
  const location = useLocation();
  const { user, isDataLoading } = useSelector(selectUser);

  const renderContent = () => {
    if (!isDataLoading) {
      return <Preloader />;
    }

    if (anonymous && user) {
      return <Navigate replace to={location.state?.from || '/'} />;
    }

    if (!anonymous && !user) {
      return <Navigate replace to='/login' state={{ from: location }} />;
    }

    return children;
  };

  return renderContent();
};

export default ProtectedRoute;
