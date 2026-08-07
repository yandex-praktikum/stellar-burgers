import { FC, useEffect } from 'react';
import { ProfileOrdersUI } from '@ui-pages';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { getOrders } from '../../services/slices/feedSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const orders = useSelector((state: RootState) => state.feed.profileOrders);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
