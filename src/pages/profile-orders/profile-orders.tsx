import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { AppDispatch, RootState } from '../../services/store';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../services/slices/orders';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */

  const dispatch: AppDispatch = useDispatch();

  const orders: TOrder[] = useSelector(
    (state: RootState) => state.orders.orders
  );

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
