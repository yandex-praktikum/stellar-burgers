import {
  getFeed,
  selectFeed,
  selectFeedOrders,
  selectOrdersLoadingState
} from '@slices';
import { useAppDispatch, useAppSelector } from '@store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';

export const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectOrdersLoadingState);
  const orders: TOrder[] = useAppSelector(selectFeedOrders);

  useEffect(() => {
    dispatch(getFeed());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(getFeed());
  };

  if (isLoading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
