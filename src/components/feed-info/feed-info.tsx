import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import {
  getOrdersInfo,
  getTotalFeeds,
  getTotalTodayFeeds
} from '../../services/slices/feed';
import { useSelector } from 'react-redux';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders: TOrder[] = useSelector(getOrdersInfo);
  const total: number = useSelector(getTotalFeeds);
  const totalToday: number = useSelector(getTotalTodayFeeds);
  const feed = {
    total: total,
    totalToday: totalToday
  };

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
