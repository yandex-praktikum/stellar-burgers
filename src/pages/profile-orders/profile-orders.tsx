import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../services/store';
import { logoutUser } from '../../services/slices/AuthSlice';
import { fetchOrders } from '../../services/slices/BurgerSlice';

export const ProfileOrders: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const orders = useSelector((state: RootState) => state.feed.orders);
  const loading = useSelector((state: RootState) => state.feed.loading);
  const error = useSelector((state: RootState) => state.feed.error);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

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
    [navigate]
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
