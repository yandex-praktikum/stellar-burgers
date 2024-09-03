import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  selectPlacedOrders,
  getPlacedOrders
} from '../../services/slices/placedOrdersSlice';
import { useSelector, useDispatch } from '../../services/store';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора - done */
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(selectPlacedOrders);
  useEffect(() => {
    dispatch(getPlacedOrders());
    console.log(getPlacedOrders());
    console.log(dispatch(getPlacedOrders()));
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
