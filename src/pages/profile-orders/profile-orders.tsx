import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from '../../../src/services/store';
import { getOrders } from '@slices';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const { orders } = useSelector((store) => store.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const ordersData: TOrder[] = orders;

  return <ProfileOrdersUI orders={ordersData} />;
};
