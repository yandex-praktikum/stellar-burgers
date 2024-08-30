import { FC } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { TOrder } from '../../utils/types';
import { FeedInfoUI } from '../ui/feed-info';
import { selectOrders, selectFeed } from '../../services/slices/feedSlice';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  /** TODO: взять переменные из стора - done*/
  const orders: TOrder[] = useSelector(selectOrders);
  const feed = useSelector(selectFeed);

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
