import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getOrdersThunk } from '../../services/burgerSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getOrdersThunk());
    }
  }, [isAuthenticated]);

  const orders: TOrder[] = useSelector((state) => state.burgers.myOrders);

  return <ProfileOrdersUI orders={orders} />;
};
