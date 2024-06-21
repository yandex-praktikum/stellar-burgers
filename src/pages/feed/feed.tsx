import { FC } from 'react';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = [];

  if (!orders.length) {
    return <Preloader />;
  }

  <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
