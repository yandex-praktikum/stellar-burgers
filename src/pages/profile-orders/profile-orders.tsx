import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../../src/services/store';
import { getUserOrders } from '../../../src/slices/userSlice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.user.userOrders);

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  } else return <ProfileOrdersUI orders={orders} />;
};
