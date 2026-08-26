import { OrdersListUI } from '@ui';
import { memo } from 'react';

import type { OrdersListProps } from './type';

export const OrdersList = memo(function OrdersList({
  orders,
}: OrdersListProps): React.JSX.Element {
  const orderByDate = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return <OrdersListUI orderByDate={orderByDate} />;
});
