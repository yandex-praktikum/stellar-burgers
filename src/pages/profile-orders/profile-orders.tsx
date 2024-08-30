import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { selectOrders, getFeeds } from '../../services/slices/feedSlice';
import { useSelector, useDispatch } from '../../services/store';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора - done */
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(selectOrders);
  useEffect(() => {
    dispatch(getFeeds());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
