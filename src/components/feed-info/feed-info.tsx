import { FC } from 'react';
import { useAppSelector } from '../../services/store';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

const getPendingOrders = (orders: TOrder[]): number[] =>
  orders
    .filter((item) => item.status === 'pending' || item.status === 'created')
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders = useAppSelector((state) => state.feed?.orders || []);
  const feed = useAppSelector((state) => state.feed || {});

  const readyOrders = getOrders(orders, 'done');
  const pendingOrders = getPendingOrders(orders);

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
