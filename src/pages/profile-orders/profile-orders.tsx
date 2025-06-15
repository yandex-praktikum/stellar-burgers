import { selectOrders } from '@selectors';
import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useSelector } from '../../services/store';
import { fetchOrders } from '../../services/slices/ordersSlice';
import { Preloader } from '@ui';
import { useDispatch } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  if (orders.length === 0) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
