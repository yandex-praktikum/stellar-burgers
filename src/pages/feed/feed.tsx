import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useSelector } from '../../services/store';
import { selectFeeds } from '@selectors';
import { fetchFeeds } from '../../services/slices/ordersSlice';
import { useDispatch } from '../../services/store';

export const Feed: FC = () => {
  const orders = useSelector(selectFeeds);
  const dispatch = useDispatch();

  const getFeeds = () => {
    dispatch(fetchFeeds());
  };

  useEffect(() => {
    getFeeds();
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={getFeeds} />;
};
