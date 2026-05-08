import { FC, useMemo } from 'react';
import { useSelector, RootState } from '../../services/store';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const { orders, total, totalToday } = useSelector(
    (state: RootState) => state.feed
  );

  const { readyOrders, pendingOrders } = useMemo(
    () => ({
      readyOrders: getOrders(orders, 'done'),
      pendingOrders: getOrders(orders, 'pending')
    }),
    [orders]
  );

  const feed = { total, totalToday };

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
