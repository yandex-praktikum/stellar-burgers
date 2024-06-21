import { FC } from 'react';
import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = [];

  return <ProfileOrdersUI orders={orders} />;
};
