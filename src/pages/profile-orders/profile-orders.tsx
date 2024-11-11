import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { AppDispatch, RootState } from '../../services/store';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../services/slices/ordersSlice';
import { getUser } from '../../services/slices/userSlice';

export const ProfileOrders: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getOrders());
  }, []);

  const orders: TOrder[] = useSelector(
    (state: RootState) => state.orders.orders
  );

  return <ProfileOrdersUI orders={orders} />;
};
