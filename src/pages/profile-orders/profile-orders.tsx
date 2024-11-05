import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getOrderList,
  getOrder,
  getOrderLoading,
  getOrderError
} from '../../services/slices/order/order-list';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const orders: TOrder[] = useSelector(getOrder);
  const isLoading = useSelector(getOrderLoading);
  const error = useSelector(getOrderError);

  useEffect(() => {
    dispatch(getOrderList());
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <ProfileOrdersUI orders={orders} />;
};
