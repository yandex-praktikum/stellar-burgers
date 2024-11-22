import { getFeed } from '@slices';
import { useAppDispatch, useAppSelector } from '@store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';

export const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.ordersState.isLoading);

  useEffect(() => {
    dispatch(getFeed());
  }, [dispatch]);

  const orders: TOrder[] = useAppSelector(
    (state) => state.ordersState.feed.orders
  );

  const handleGetFeeds = () => {
    dispatch(getFeed());
  };

  if (isLoading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
