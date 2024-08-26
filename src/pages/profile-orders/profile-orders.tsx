import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { getOrders, getUsersOrders } from '../../services/slices/profileOrders';
import { useSelector } from 'react-redux';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsersOrders());
  }, []);
  const orders: TOrder[] = useSelector(getOrders);

  return <ProfileOrdersUI orders={orders} />;
};
