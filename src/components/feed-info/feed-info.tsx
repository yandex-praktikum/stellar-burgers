import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { AppDispatch, RootState } from '../../services/store';
import { useDispatch, useSelector } from 'react-redux';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  /** TODO: взять переменные из стора */

  const dispatch: AppDispatch = useDispatch();

  const orders: TOrder[] = useSelector((state: RootState) => state.feed.orders);

  // const orders: TOrder[] = [];
  const feed = useSelector((state: RootState) => state.feed);

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
