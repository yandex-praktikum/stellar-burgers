// src/components/Feed.tsx
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { getAllFeeds } from '../../components/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const orders: TOrder[] = useSelector((state) => state.feeds.orders);
  const isLoading = useSelector((state) => state.feeds.isLoading);

  useEffect(() => {
    dispatch(getAllFeeds());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(getAllFeeds())} />
  );
};
