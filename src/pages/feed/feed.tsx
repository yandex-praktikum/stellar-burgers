import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect, useCallback } from 'react';
import {
  fetchFeeds,
  getLoadingFeed,
  getOrders
} from '../../services/feedSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getOrders);
  const isLoading = useSelector(getLoadingFeed);

  useEffect(() => {
    console.log('Fetching feeds...');
    dispatch(fetchFeeds());
  }, [dispatch]);

  const handleGetFeed = useCallback(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <>
      <FeedUI orders={orders} handleGetFeeds={handleGetFeed} />
    </>
  );
};
