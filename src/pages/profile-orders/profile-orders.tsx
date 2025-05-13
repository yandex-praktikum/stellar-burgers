import { FC, useEffect } from 'react';

import { ProfileOrdersUI } from '@ui-pages';
import {
  userOrdersSelector,
  getOrdersThunk
} from '../../services/slices/userSlice';
import { useDispatch, useSelector } from '../../services/store';
import { TOrder } from '@utils-types';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(userOrdersSelector);
  useEffect(() => {
    dispatch(getOrdersThunk());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
