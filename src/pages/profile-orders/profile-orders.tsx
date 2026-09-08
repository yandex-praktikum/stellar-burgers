import { ProfileOrdersUI } from '@ui-pages';

import type { TOrder } from '@utils-types';

export const ProfileOrders = (): React.JSX.Element => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = [];

  return <ProfileOrdersUI orders={orders} />;
};
