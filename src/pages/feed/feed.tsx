import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch } from '../../../src/services/store';
import { getFeeds } from '../../slices/feedsSlice';
import { useSelector } from '../../services/store';

export const Feed: FC = () => {
  const orders = useSelector((state) => state.feeds.orders);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeeds());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeeds())} />;
};
