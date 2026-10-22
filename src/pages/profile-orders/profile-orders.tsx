import { useDispatch, useSelector } from '@/services/store';
// import type { TOrder } from '@utils-types';
import { ProfileOrdersUI } from '@ui-pages';
import { useEffect } from 'react';

import { fetchUserOrders } from '../../services/slices/userOrdersSlice';

export const ProfileOrders = (): React.JSX.Element => {
  /** TODO: взять переменную из стора */
  // const orders: TOrder[] = [];

  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.userOrders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
