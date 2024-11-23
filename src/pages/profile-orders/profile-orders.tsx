import { fetchIngredients, getUsersOrders, selectUsersOrders } from '@slices';
import { useAppDispatch, useAppSelector } from '@store';
import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';

export const ProfileOrders: FC = () => {
  const dispatch = useAppDispatch();
  const orders: TOrder[] = useAppSelector(selectUsersOrders);

  useEffect(() => {
    dispatch(getUsersOrders());
    dispatch(fetchIngredients());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
