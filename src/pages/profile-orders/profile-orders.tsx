import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { getOrdersThunk, selectOrders } from '../../services/orderSlice';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersThunk());
  }, []);

  const orders: TOrder[] = useSelector(selectOrders) || [];

  return <ProfileOrdersUI orders={orders} />;
};
