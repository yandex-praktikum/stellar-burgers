import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeedsApi } from '@api';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC } from 'react';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const { items: orders, isLoading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getFeedsApi() as any);
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
