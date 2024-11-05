import { useEffect, FC } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchGetFeed,
  getOrdersFeeds,
  getTotalFeeds,
  getTotalTodayFeeds
} from '../../services/slices/feeds/feeds';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetFeed());
  }, [dispatch]);

  const orders = useSelector(getOrdersFeeds);
  const total = useSelector(getTotalFeeds);
  const totalToday = useSelector(getTotalTodayFeeds);

  const readyOrders = getOrders(orders, 'done');
  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={{ total, totalToday }}
    />
  );
};
