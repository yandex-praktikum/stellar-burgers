import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useSelector } from '../../services/store';
import {
  ordersSelector,
  totalOrdersSelector,
  totalTodayOrdersSelector
} from '../../services/slices/feedsSlice';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  /** TODO: взять переменные из стора */
  // const orders: TOrder[] = [];
  const orders = useSelector(ordersSelector);

  const totalFeeds = useSelector(totalOrdersSelector);
  const totalToodayFeeds = useSelector(totalTodayOrdersSelector);
  const feed = { total: totalFeeds, totalToday: totalToodayFeeds };

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
