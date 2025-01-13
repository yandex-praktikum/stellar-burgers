import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector } from 'react-redux';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(
    (state: any) => state.orderReducer.orders
  );
  console.log('orders ProfileOrders: ', JSON.stringify(orders));

  return <ProfileOrdersUI orders={orders} />;
};
