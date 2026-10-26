// import type { TOrder } from '@utils-types';
import { useDispatch, useSelector } from '@/services/store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { useEffect } from 'react';

import { fetchFeeds } from '../../services/slices/feedsSlice';

export const Feed = (): React.JSX.Element => {
  // TODO: Взять переменную из стора
  // const orders: TOrder[] = [];
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector((state) => state.feeds);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  const handleGetFeeds = (): void => {
    // TODO: Запросить ленту заказов
    dispatch(fetchFeeds());
  };

  if (isLoading && !orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
