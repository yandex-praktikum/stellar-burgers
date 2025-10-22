import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { fetchOrders, selectOrders } from '@slices';
import { useDispatch, useSelector } from '@store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const ordersData = useSelector(selectOrders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={ordersData} />;
};
