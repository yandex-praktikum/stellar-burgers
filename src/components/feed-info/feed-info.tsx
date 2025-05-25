import { FC } from 'react';
import { useAppSelector } from '@app-store';
import { TOrder, TOrdersData } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { getOrders as getOrdersSlice, getTotal, getTotalToday } from '@slices';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const total = useAppSelector(getTotal);
  const totalToday = useAppSelector(getTotalToday);
  const orders = useAppSelector(getOrdersSlice);
  const feed = { total, totalToday };

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
