import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { logoutUser } from '../../services/slices/AuthSlice';
import { fetchOrders } from '../../services/slices/BurgerSlice';

export const ProfileOrders: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const orders = useAppSelector((state) => state.feed.orders);
  const loading = useAppSelector((state) => state.feed.loading);
  const error = useAppSelector((state) => state.feed.error);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchOrders());
    }
  }, [dispatch, isAuthenticated]);

  const handleOrderClick = useCallback(
    (order: TOrder) => {
      navigate(`/profile/orders/${order.number}`, {
        state: { background: location }
      });
    },
    [navigate, location]
  );

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        navigate('/login', { replace: true });
      })
      .catch((error: any) => {
        console.error('Logout error:', error);
        navigate('/login', { replace: true });
      });
  };

  const ordersToDisplay = loading || error ? [] : orders;

  return (
    <ProfileOrdersUI
      orders={ordersToDisplay}
      onOrderClick={handleOrderClick}
      onLogout={handleLogout}
    />
  );
};
