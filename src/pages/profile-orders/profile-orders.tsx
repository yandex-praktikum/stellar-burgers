import { fetchIngredients, getUsersOrders } from '@slices';
import { useAppDispatch, useAppSelector } from '@store';
import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';

export const ProfileOrders: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsersOrders());
    dispatch(fetchIngredients());
  }, [dispatch]);

  const orders: TOrder[] = useAppSelector(
    (state) => state.ordersState.usersOrders.orders
  );

  return <ProfileOrdersUI orders={orders} />;
};
