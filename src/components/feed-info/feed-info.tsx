import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useAppSelector } from '../../services/store';
import {
  selectOrders,
  selectTodayOrders,
  selectTotalOrders
} from '../../slices/stellarBurgerSlice';
import { FeedInfoUI } from '../ui/feed-info';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders: TOrder[] = useAppSelector(selectOrders);
  const total = useAppSelector(selectTotalOrders);
  const totalToday = useAppSelector(selectTodayOrders);

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
