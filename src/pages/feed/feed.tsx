import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@app-store';
import { FeedsThunk, getOrders } from '@slices';

export const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const orders: TOrder[] = useAppSelector(getOrders);

  const handleFeedUpdate = () => {
    dispatch(FeedsThunk());
  };

  useEffect(() => {
    const interval = setInterval(handleFeedUpdate, 2000);
    return () => clearInterval(interval);
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }
  return <FeedUI orders={orders} handleGetFeeds={handleFeedUpdate} />;
};
