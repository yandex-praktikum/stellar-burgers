import { FC } from 'react';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
//импортировать селекторы getOrders getTotal getTotalToday
import {
  getOrders,
  getOrdersTotal,
  getOrdersTotalToday
} from '../../services/feedSlice';
import { useSelector } from '../../services/store';

const getFeed = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  /** TODO: взять переменные из стора */
  const orders: TOrder[] = useSelector(getOrders);
  const feed = {
    total: useSelector(getOrdersTotal),
    totalToday: useSelector(getOrdersTotalToday)
  };

  const readyOrders = getFeed(orders, 'done');

  const pendingOrders = getFeed(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
