import { FC, useEffect } from 'react';
import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserOrdersThunk,
  selectUserOrders
} from '../../Slices/userOrdersSlice';
import { AppDispatch } from 'src/services/store';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getUserOrdersThunk());
  }, []);

  const orders: TOrder[] = useSelector(selectUserOrders);

  return <ProfileOrdersUI orders={orders} />;
};
